using RestoreAPI.Entites;

namespace RestoreAPI.DTOs
{
    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public required string Name { get; set; }
        public long Price { get; set; }
        public required string PictureUrl { get; set; }
        public required string Brand { get; set; }
        public required string Type { get; set; }
        public int Quantity { get; set; }
    }
}