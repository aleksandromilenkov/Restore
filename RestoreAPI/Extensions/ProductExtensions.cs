using Microsoft.EntityFrameworkCore;
using RestoreAPI.Entites;

namespace RestoreAPI.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> products, string? orderBy)
        {
            products = orderBy switch
            {
                "price" => products.OrderBy(p => p.Price),
                "priceDesc" => products.OrderByDescending(p => p.Price),
                _ => products.OrderBy(p => p.Name),
            };
            return products;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> products, string? term)
        {
            if (string.IsNullOrEmpty(term)) return products;

            var lowerCaseSearchTerm = term.ToLower();
            return products.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}
