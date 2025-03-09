using Microsoft.EntityFrameworkCore;

namespace RestoreAPI.Entites.OrderAggregate
{
    [Owned]
    public class ProductIdOrdered
    {
        public int ProductId { get; set; }
        public required string Name { get; set; }
        public required string PictureUrl { get; set; }
    }
}
