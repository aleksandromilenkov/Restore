﻿using RestoreAPI.Entites.OrderAggregate;

namespace RestoreAPI.DTOs
{
    public class OrderItemDTO
    {
        public int ProductId { get; set; }
        public required string Name { get; set; }
        public required string PictureUrl { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}
