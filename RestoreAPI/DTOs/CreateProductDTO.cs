﻿using System.ComponentModel.DataAnnotations;

namespace RestoreAPI.DTOs
{
    public class CreateProductDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        [Range(100, double.PositiveInfinity)]   
        public long Price { get; set; }
        [Required]
        public string PictureUrl { get; set; } = string.Empty;
        [Required]
        public required string Type { get; set; }
        [Required]
        public required string Brand { get; set; }
        [Required]
        [Range(0, 500)]
        public int QuantityInStock { get; set; }
    }
}
