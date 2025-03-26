using Microsoft.EntityFrameworkCore;
using RestoreAPI.DTOs;
using RestoreAPI.Entites.OrderAggregate;

namespace RestoreAPI.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectToDTO(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDTO
            {
                Id = order.Id,
                BuyerEmail = order.BuyerEmail,
                ShippingAddress = order.ShippingAddress,
                OrderDate = order.OrderDate,
                OrderStatus = order.OrderStatus.ToString(),
                PaymentSummary = order.PaymentSummary,
                DeliveryFee = order.DeliveryFee,
                Subtotal = order.Subtotal,
                Discount = order.Discount,
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => item.ToOrderItemDTO()).ToList(),
            }).AsNoTracking();
        }
        public static OrderDTO ToOrderDTO(this Order order)
        {
            return new OrderDTO()
            {
                Id = order.Id,
                BuyerEmail = order.BuyerEmail,
                ShippingAddress = order.ShippingAddress,
                OrderDate = order.OrderDate,
                OrderStatus = order.OrderStatus.ToString(),
                PaymentSummary = order.PaymentSummary,
                DeliveryFee = order.DeliveryFee,
                Discount = order.Discount,
                Subtotal = order.Subtotal,
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => item.ToOrderItemDTO()).ToList(),
            };
        }
    }
}
