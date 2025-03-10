using System.Security.Claims;

namespace RestoreAPI.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Identity?.Name ?? throw new UnauthorizedAccessException();
        }
    }
}
