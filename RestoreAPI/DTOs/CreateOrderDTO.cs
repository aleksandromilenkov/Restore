using RestoreAPI.Entites.OrderAggregate;

namespace RestoreAPI.DTOs
{
    public class CreateOrderDTO
    {
        public required ShippingAddress ShippingAddress { get; set; }
        public required PaymentSummary PaymentSummary { get; set; }
    }
}
