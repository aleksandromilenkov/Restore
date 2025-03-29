using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.DTOs;
using RestoreAPI.Entites;
using RestoreAPI.Services;

namespace RestoreAPI.Controllers
{
    public class AccountController(SignInManager<User> signInManager, ImageService _imageService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDTO registerDTO)
        {
            var user = new User { UserName = registerDTO.Email, Email = registerDTO.Email };
            var result = await signInManager.UserManager.CreateAsync(user, registerDTO.Password);
            if (!result.Succeeded) { 
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await signInManager.UserManager.AddToRoleAsync(user, "Member");
            return Ok();
        }

        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if (User.Identity?.IsAuthenticated == false) return NoContent();
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            var roles = await signInManager.UserManager.GetRolesAsync(user);
            return Ok(new
            {
                user.Email,
                user.UserName,
                user.PictureUrl,
                Roles = roles
            });
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync(); // cannot remove the cookie from client because it's http only so we must logout in the server
            return NoContent();
        }

        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
        {
            var user = await signInManager.UserManager.Users.Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == User.Identity!.Name);
            if (user == null) return Unauthorized();
            user.Address = address;
            var result = await signInManager.UserManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest("Problem updating user address.");
            return Ok(user.Address);
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<Address>> GetSavedAddress()
        {
            var address = await signInManager.UserManager.Users.Where(u => u.UserName == User.Identity!.Name)
                .Select(u => u.Address).FirstOrDefaultAsync();
            if(address == null) return NoContent();
            return Ok(address);
        }

        [Authorize]
        [HttpPut("update-email")]
        public async Task<ActionResult> UpdateEmail([FromBody] UpdateEmailDTO updateEmailDto)
        {
            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName)) return Unauthorized();

            var user = await signInManager.UserManager.FindByNameAsync(userName);
            if (user == null) return Unauthorized();


            var emailExists = await signInManager.UserManager.FindByEmailAsync(updateEmailDto.NewEmail);
            if (emailExists != null) return BadRequest("Email is already in use.");

            var emailResult = await signInManager.UserManager.SetEmailAsync(user, updateEmailDto.NewEmail);
            if (!emailResult.Succeeded) return BadRequest(emailResult.Errors.Select(e => e.Description));

            var usernameResult = await signInManager.UserManager.SetUserNameAsync(user, updateEmailDto.NewEmail);
            
            if (!usernameResult.Succeeded) return BadRequest(usernameResult.Errors.Select(e => e.Description));
            
            await signInManager.SignInAsync(user, isPersistent: false); // refresh authentication to update claims

            return Ok(new { message = "Email updated successfully." });

        }

        [Authorize]
        [HttpPut("update-password")]
        public async Task<ActionResult> UpdatePassword([FromBody] UpdatePasswordDTO updatePasswordDto)
        {
            var user = await signInManager.UserManager.FindByNameAsync(User.Identity!.Name);
            if (user == null) return Unauthorized();

            var result = await signInManager.UserManager.ChangePasswordAsync(user, updatePasswordDto.CurrentPassword, updatePasswordDto.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }

            return Ok(new { message = "Password updated successfully." });

        }

        [Authorize]
        [HttpPut("update-image")]
        public async Task<ActionResult> UpdateImage([FromForm] UpdateImageDTO updateImageDTO)
        {
            var user = await signInManager.UserManager.FindByNameAsync(User.Identity!.Name);
            if (user == null) return Unauthorized();

            if (updateImageDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateImageDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest($"Error {imageResult.Error.Message}");
                }
                if (!string.IsNullOrEmpty(user.PublicId))
                {
                    await _imageService.DeleteImageAsync(user.PublicId);
                }
                user.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                user.PublicId = imageResult.PublicId;
                var updateResult = await signInManager.UserManager.UpdateAsync(user);
                if (!updateResult.Succeeded)
                {
                    return BadRequest(updateResult.Errors.Select(e => e.Description));
                }
            }
            return NoContent();
        }

    }
}
