using System.ComponentModel.DataAnnotations.Schema;

namespace RestoreAPI.Entites.OrderAggregate
{
    [Table("OrderItems")]
    public class OrderItem
    {
        public int Id { get; set; }
        public required ProductIdOrdered ItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}
