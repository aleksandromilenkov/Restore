﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.Entites;
using RestoreAPI.Extensions;
using RestoreAPI.RequestHelpers;

namespace RestoreAPI.Controllers
{
    public class ProductsController(StoreContext _context) : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(typeof(Product), 200)]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductsQueryObject queryObject)
        {
            var query = _context.Products
                .Sort(queryObject.OrderBy)
                .Search(queryObject.SearchTerm)
                .Filter(queryObject.Brands, queryObject.Types)
                .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query, queryObject.PageNumber, queryObject.PageSize);
            Response.AddPaginationHeader(products.Metadata);
            return products;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProductById([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest("Invalid product ID.");
            var product = await _context.Products.FindAsync(id);
            return product is null ? NotFound() : Ok(product);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p =>  p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p =>  p.Type).Distinct().ToListAsync();
            return Ok(new {Brands = brands, Types = types});
        }
    }
}
