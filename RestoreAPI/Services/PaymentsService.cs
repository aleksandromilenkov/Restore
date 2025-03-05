using RestoreAPI.Entites;
using Stripe;

namespace RestoreAPI.Services
{
    public class PaymentsService(IConfiguration config)
    {
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Cart cart)
        {
            StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            var subtotal = cart.Items.Sum(i => i.Quantity * i.Product.Price);
            var deliveryFee = subtotal > 10000 ? 0 : 500;
            if (string.IsNullOrEmpty(cart.PaymentIntentId)) {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await service.CreateAsync(options);
            } else {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFee,
                };
                await service.UpdateAsync(cart.PaymentIntentId, options);
            }
            return intent;
        }
    }
}
