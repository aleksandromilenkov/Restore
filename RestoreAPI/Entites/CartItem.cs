using System.ComponentModel.DataAnnotations.Schema;

namespace RestoreAPI.Entites
{
    [Table("CartItems")]
    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation properties
        public int ProductId { get; set; }
        public required Product Product { get; set; }
        public int CartId { get; set; } // convention to make sure that there is no CartItem without a Cart associated to
        public Cart Cart { get; set; } = null!;
    }
}
