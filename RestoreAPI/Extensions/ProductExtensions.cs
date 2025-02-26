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

        public static IQueryable<Product> Filter(this IQueryable<Product> products, string? brands, string? types)
        {
            if (!string.IsNullOrEmpty(brands)) {
                var brandList = brands.ToLower().Split(",").ToList(); // or we can use HashSet instead of list like this new HashSet<string>(brands.ToLower().Split(",")); since HashSets.Contains has speed O(1) and List.Contains O(n)
                products = products.Where(p=> brandList.Contains(p.Brand.ToLower()));
            }            
            if (!string.IsNullOrEmpty(types)) {
                var typeList = types.ToLower().Split(",").ToList();
                products = products.Where(p=> typeList.Contains(p.Type.ToLower()));
            }
            return products;
        }
    }
}
