using Microsoft.EntityFrameworkCore;
using RestoreAPI.Entites;

namespace RestoreAPI.Data
{
    public class StoreContext(DbContextOptions options) : DbContext(options)
    {
        public required DbSet<Product> Products { get; set; }
    }
}
