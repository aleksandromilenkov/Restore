﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RestoreAPI.Entites;
using Stripe;

namespace API.Services
{
    public class DiscountService
    {
        public DiscountService(IConfiguration config)
        {
            StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
        }

        public async Task<AppCoupon?> GetCouponFromPromoCode(string code)
        {
            var promotionService = new PromotionCodeService();
            try
            {
                // Find the promotion code from Stripe
                var promotionCodes = await promotionService.ListAsync(new PromotionCodeListOptions
                {
                    Code = code,
                    Limit = 1
                });

                var promotion = promotionCodes.Data.FirstOrDefault();
                if (promotion == null) return null;

                var stripeCoupon = promotion.Coupon;

                return new AppCoupon
                {
                    CouponId = stripeCoupon.Id,
                    Name = stripeCoupon.Name ?? "Unnamed Coupon",
                    AmountOff = stripeCoupon.AmountOff,
                    PercentOff = stripeCoupon.PercentOff,
                    PromotionCode = promotion.Id.GetHashCode()
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching coupon: {ex.Message}");
                return null;
            }
        }

        public long CalculateDiscountFromAmount(AppCoupon appCoupon, long amount, bool removeDiscount = false)
        {
            if (appCoupon == null) return amount;

            long discountAmount = 0;

            if (appCoupon.AmountOff.HasValue)
            {
                discountAmount = appCoupon.AmountOff.Value;
            }
            else if (appCoupon.PercentOff.HasValue)
            {
                discountAmount = (long)Math.Round(amount * (appCoupon.PercentOff.Value / 100m),
                    MidpointRounding.AwayFromZero);
            }

            return removeDiscount ? amount + discountAmount : amount - discountAmount;
        }
    }
}
