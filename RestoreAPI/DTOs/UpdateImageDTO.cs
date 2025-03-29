using System.ComponentModel.DataAnnotations;

namespace RestoreAPI.DTOs
{
    public class UpdateImageDTO
    {
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
