using RestoreAPI.Entites;

namespace RestoreAPI.DTOs
{
    public class CartDTO
    {
        public required string CartId { get; set; } 
        public List<CartItemDTO> Items { get; set; } = new List<CartItemDTO>();
    }
}
