using RestoreAPI.DTOs;
using RestoreAPI.Entites.OrderAggregate;

namespace RestoreAPI.Extensions
{
    public static class OrderItemExtensions
    {
        public static OrderItemDTO ToOrderItemDTO(this OrderItem orderItem)
        {
            return new OrderItemDTO()
            {
                ProductId = orderItem.ItemOrdered.ProductId,
                Name = orderItem.ItemOrdered.Name,
                PictureUrl = orderItem.ItemOrdered.PictureUrl,
                Price = orderItem.Price,
                Quantity = orderItem.Quantity,
            };
        }
    }
}
