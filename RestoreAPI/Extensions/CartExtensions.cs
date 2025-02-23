using RestoreAPI.DTOs;
using RestoreAPI.Entites;

namespace RestoreAPI.Extensions
{
    public static class CartExtensions
    {
        public static CartDTO ToDTO(this Cart cart)
        {
            return new CartDTO()
            {
                CartId = cart.CartId,
                Items = cart.Items.Select(i => new CartItemDTO()
                {
                    ProductId = i.ProductId,
                    Name = i.Product.Name,
                    Price = i.Product.Price,
                    Brand = i.Product.Brand,
                    Type = i.Product.Type,
                    PictureUrl = i.Product.PictureUrl,
                    Quantity = i.Quantity
                }).ToList()
            };
        }
    }
}
