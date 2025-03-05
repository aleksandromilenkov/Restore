using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.DTOs;
using RestoreAPI.Entites;
using RestoreAPI.Extensions;

namespace RestoreAPI.Controllers
{
    public class CartController(StoreContext _context) : BaseApiController
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
