using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestoreAPI.Data;
using RestoreAPI.DTOs;
using RestoreAPI.Extensions;
using RestoreAPI.Services;

namespace RestoreAPI.Controllers
{
    public class PaymentsController(PaymentsService paymentsService, StoreContext context) : BaseApiController
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
    }
}
