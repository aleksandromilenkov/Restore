using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.DTOs;
using RestoreAPI.Entites;
using RestoreAPI.Entites.OrderAggregate;
using RestoreAPI.Extensions;

namespace RestoreAPI.Controllers
{
    [Authorize]
    public class OrdersController(StoreContext _context, DiscountService discountService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            var orders = await _context.Orders
                .ProjectToDTO()
                .Where(o => o.BuyerEmail == User.GetUserName())
                .ToListAsync();
            return orders;
        }

        [HttpGet("{id:int}", Name ="GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrderDetails(int id)
        {
            var order = await _context.Orders
                .ProjectToDTO()
                .Where(o => o.BuyerEmail == User.GetUserName() && o.Id == id)
                .FirstOrDefaultAsync();
            if (order == null) return NotFound();
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] CreateOrderDTO createOrderDto)
        {
            var cart = await _context.Carts.GetCartWithItems(Request.Cookies["cartId"]);
            if (cart == null || cart.Items.Count == 0 || string.IsNullOrEmpty(cart.PaymentIntentId))
                return BadRequest("Cart is empty or not found");
            var items = CreateOrderItems(cart.Items);
            if (items == null) return BadRequest("Some items out of stock");
            var subtotal = items.Sum(i => i.Price * i.Quantity);
            var discount = cart.AppCoupon != null
                ? subtotal - discountService.CalculateDiscountFromAmount(cart.AppCoupon, subtotal)
                : 0;
            var deliveryFee = CalculateDeliveryFee(subtotal);
            var order = await _context.Orders.Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.PaymentIntentId == cart.PaymentIntentId);
            if (order == null)
            {
                order = new Order()
                {
                    BuyerEmail = User.GetUserName(),
                    OrderItems = items,
                    ShippingAddress = createOrderDto.ShippingAddress,
                    PaymentSummary = createOrderDto.PaymentSummary,
                    Subtotal = subtotal,
                    DeliveryFee = deliveryFee,
                    Discount = discount,
                    PaymentIntentId = cart.PaymentIntentId,
                };
                await _context.Orders.AddAsync(order);
            } else {
                order.OrderItems = items;
            }
            var result = await _context.SaveChangesAsync() > 0;
            return result ? CreatedAtAction(nameof(GetOrderDetails), new {id = order.Id}, order.ToOrderDTO()) : BadRequest("Cannot create order");
        }

        private List<OrderItem>? CreateOrderItems(List<CartItem> items)
        {
            var orderItems = new List<OrderItem>();
            foreach (var item in items) { 
                if (item.Quantity >= item.Product.QuantityInStock) return null;
                var productIdOrdered = new ProductIdOrdered() { ProductId = item.ProductId, Name = item.Product.Name, PictureUrl = item.Product.PictureUrl };
                var orderItem = new OrderItem() { ItemOrdered = productIdOrdered, Price = item.Product.Price, Quantity = item.Quantity };
                orderItems.Add(orderItem);
                item.Product.QuantityInStock -= item.Quantity;
            }
            return orderItems;
        }

        private long CalculateDeliveryFee(long subtotal)
        {
            return subtotal > 10000 ? 0 : 500;
        }
    }
}
