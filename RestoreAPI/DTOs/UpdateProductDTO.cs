﻿using System.ComponentModel.DataAnnotations;

namespace RestoreAPI.DTOs
{
    public class UpdateProductDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        [Range(100, double.PositiveInfinity)]
        public long Price { get; set; }

        public IFormFile? File { get; set; }
        [Required]
        public required string Type { get; set; }
        [Required]
        public required string Brand { get; set; }
        [Required]
        [Range(0, 500)]
        public int QuantityInStock { get; set; }
    }
}
