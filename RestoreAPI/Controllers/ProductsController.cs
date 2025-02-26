using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.Entites;
using RestoreAPI.Extensions;

namespace RestoreAPI.Controllers
{
    public class ProductsController(StoreContext _context) : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(typeof(Product), 200)]
        public async Task<ActionResult<List<Product>>> GetProducts(string? orderBy, string? searchTerm)
        {
            var query = _context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .AsQueryable();
            var products = await query.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProductById([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest("Invalid product ID.");
            var product = await _context.Products.FindAsync(id);
            return product is null ? NotFound() : Ok(product);
        }
    }
}
