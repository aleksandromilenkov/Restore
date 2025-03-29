using Microsoft.AspNetCore.Identity;

namespace RestoreAPI.Entites
{
    public class User : IdentityUser
    {
        public int? AddressId { get; set; }
        public Address? Address { get; set; }
        public string? PictureUrl { get; set; }
        public string? PublicId { get; set; }
    }
}
