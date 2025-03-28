﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.DTOs;
using RestoreAPI.Entites;
using RestoreAPI.Extensions;
using RestoreAPI.RequestHelpers;
using RestoreAPI.Services;

namespace RestoreAPI.Controllers
{
    public class ProductsController(StoreContext _context, IMapper _mapper, ImageService _imageService) : BaseApiController
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
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { Brands = brands, Types = types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDTO createProductDTO)
        {
            var product = _mapper.Map<Product>(createProductDTO);
            if(createProductDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createProductDTO.File);
                if(imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }
                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }
            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;
            return result ? CreatedAtAction(nameof(GetProductById), new { Id = product.Id }, product) : BadRequest("Problem creating new Product");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductDTO updateProductDTO)
        {
            var product = await _context.Products.FindAsync(updateProductDTO.Id);
            if (product == null) return NotFound();
            _mapper.Map(updateProductDTO, product); // mapping from dto to the tracking product from the DB
            if (updateProductDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateProductDTO.File);
                if (imageResult.Error != null)
                {
                    return BadRequest($"Error {imageResult.Error.Message}");
                }
                if (!string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }
                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }
            var result = await _context.SaveChangesAsync() > 0;
            return result ? NoContent() : BadRequest("Problem updating product");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await _imageService.DeleteImageAsync(product.PublicId);
            }
            _context.Products.Remove(product);
            var result = await _context.SaveChangesAsync() > 0;
            return result ? NoContent() : BadRequest("Problem removing product");
        }
    }
}
