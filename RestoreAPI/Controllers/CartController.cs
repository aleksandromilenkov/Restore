using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.DTOs;
using RestoreAPI.Entites;
using RestoreAPI.Extensions;
using RestoreAPI.Services;

namespace RestoreAPI.Controllers
{
    public class CartController(StoreContext _context, DiscountService discountService, PaymentsService paymentsService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.CartId == Request.Cookies["cartId"]);

            if (cart == null) return NoContent();

            return cart.ToDTO();
        }

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            // get the Cart from the DB
            var cart = await _context.Carts.GetCartWithItems(Request.Cookies["cartId"]);
            // if no Cart then create the Cart
            cart ??= CreateCart();
            // get Product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest("Problem adding item to cart. Product does not exists.");
            // Add Item to Cart
            cart.AddItem(product, quantity);
            // Save the Changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetCart), cart.ToDTO());
            return BadRequest("Problem updating cart");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            // get the Cart from the DB
            var cart = await _context.Carts.GetCartWithItems(Request.Cookies["cartId"]);
            if(cart == null) return BadRequest("Unable to retreive the cart.");
            // remove the Item or reduce it's quantity
            cart.RemoveItem(productId, quantity);
            // Save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return StatusCode(204);
            return BadRequest("Problem removing item.");
        }

        [HttpPost("{code}")]
        public async Task<ActionResult<CartDTO>> AddCouponCode(string code)
        {
            // get the cart and check to ensure it has the client secret
            var cart = await _context.Carts.GetCartWithItems(Request.Cookies["cartId"]);
            if (cart == null || cart.ClientSecret == null) { return BadRequest(); }
            // get the coupon
            var coupon = await discountService.GetCouponFromPromoCode(code);
            // update the cart with the coupon
            cart.AppCoupon = coupon;
            // update the payment intent
            await paymentsService.CreateOrUpdatePaymentIntent(cart);
            // save changes and return CartDTO if successful
            var changes = await _context.SaveChangesAsync() > 0;
            return changes ? cart.ToDTO() : BadRequest("Invalid coupon code");
        }
        [HttpDelete("remove-coupon")]
        public async Task<ActionResult> RemoveCouponFromCart()
        {
            // get the cart and check to ensure it has the client secret
            var cart = await _context.Carts.GetCartWithItems(Request.Cookies["cartId"]);
            if (cart == null || cart.ClientSecret == null) { return BadRequest(); }
            // update the payment intent
            await paymentsService.CreateOrUpdatePaymentIntent(cart);
            // Remove the coupon from the cart (set it to null)
            cart.AppCoupon = null;
            // save changes and return Ok() if successful
            var changes = await _context.SaveChangesAsync() > 0;
            return changes ? Ok() : BadRequest();
        }

        private Cart CreateCart()
        {
            var cartId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("cartId", cartId, cookieOptions);
            var cart = new Cart() { CartId = cartId };
            _context.Carts.Add(cart);
            return cart;
        }
    }
}
