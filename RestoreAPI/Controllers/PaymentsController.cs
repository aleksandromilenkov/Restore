using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.DTOs;
using RestoreAPI.Entites.OrderAggregate;
using RestoreAPI.Extensions;
using RestoreAPI.Services;
using Stripe;

namespace RestoreAPI.Controllers
{
    public class PaymentsController(PaymentsService paymentsService,
        StoreContext context, IConfiguration config, ILogger logger) : BaseApiController
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CartDTO>> CreateOrUpdateIntent()
        {
            var cart = await context.Carts.GetCartWithItems(Request.Cookies["cartId"]);
            if (cart == null) return BadRequest("Problem with retreiving the cart");
            var intent = await paymentsService.CreateOrUpdatePaymentIntent(cart);
            if (intent == null) return BadRequest("Problem creating payment intent");
            cart.PaymentIntentId ??= intent.Id;
            cart.ClientSecret ??= intent.ClientSecret;
            if (context.ChangeTracker.HasChanges()) {
                var result = await context.SaveChangesAsync() > 0;
                if (!result) return BadRequest("Problem updating cart with intent");
            }
            return cart.ToDTO();
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = ConstructStripeEvent(json);
                if(stripeEvent.Data.Object is not PaymentIntent intent) {
                    return BadRequest("Invalid event data");
                }
                if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
                else await HandlePaymentIntentFailed(intent);
                return Ok();
            }
            catch(StripeException e) {
                logger.LogError(e, "Stripe webhook error");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
            }
            catch(Exception e)
            {
                logger.LogError(e, "Unexpected error has occurred");
                return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error");
            }
        }

        private async Task HandlePaymentIntentFailed(PaymentIntent intent)
        {
            var order = await context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.PaymentIntentId == intent.Id) ?? throw new Exception("Order not found");
            foreach(var item in order.OrderItems)
            {
                var productItem = await context.Products.FindAsync(item.ItemOrdered.ProductId) ?? throw new Exception("Problem updating Order stock");
                productItem.QuantityInStock += item.Quantity;
            }
            order.OrderStatus = OrderStatus.PaymentFailed;
            await context.SaveChangesAsync();
        }

        private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            var order = await context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.PaymentIntentId.Equals(intent.Id)) ?? throw new Exception("Order not found");
            if (intent.Amount != order.GetTotal()) {
                order.OrderStatus = OrderStatus.PaymentMismatch;
            }
            else {
                order.OrderStatus = OrderStatus.PaymentReceived;
            }
            var cart = await context.Carts.FirstOrDefaultAsync(c => c.PaymentIntentId == intent.Id);
            if (cart != null) {
                context.Carts.Remove(cart);
            }
            await context.SaveChangesAsync();
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], config["StripeSettings:WhSecret"]);

            }catch(Exception e)
            {
                logger.LogError(e, "Failed to construct stripe event");
                throw new StripeException("Invalid signature");
            }
        }
    }
}
