using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.Entites;

namespace RestoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(StoreContext _context) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(Product), 200)]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return Ok(await _context.Products.ToListAsync());
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
