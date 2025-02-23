
namespace RestoreAPI.Entites
{
    public class Cart
    {
        public int Id { get; set; }
        public required string CartId { get; set; } // store this as cookie in browser (int for Id, guid for storing)
        public List<CartItem> Items { get; set; } = new List<CartItem>();
        public void AddItem(Product product, int quantity)
        {
            if (product == null) ArgumentNullException.ThrowIfNull(product);
            if (quantity <= 0) throw new ArgumentException("Quantity should be greater than 0", nameof(quantity));

            var existingItem = FindItem(product.Id);
            if (existingItem == null) {
                Items.Add(new CartItem()
                {
                    Quantity = quantity,
                    Product = product,
                });
            } else {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity should be greater than 0", nameof(quantity));
            var item = FindItem(productId);
            if (item == null) return;

            item.Quantity -= quantity;
            if(item.Quantity <= 0) {
                Items.Remove(item);
            }
        }

        private CartItem? FindItem(int productId)
        {
           return Items.FirstOrDefault(item => item.ProductId == productId);
        }
    }
}
