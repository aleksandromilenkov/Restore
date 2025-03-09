using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Entites;
using RestoreAPI.Entites.OrderAggregate;

namespace RestoreAPI.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Cart> Carts { get; set; }
        public required DbSet<Order> Orders { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole()
                    {
                        Id = "b07d2146-0b19-4ae8-a55f-166ae5ebe7ea",
                        Name = "Member",
                        NormalizedName = "MEMBER"
                    },
                    new IdentityRole()
                    {
                        Id = "71568c76-bd8d-4a11-ab34-37362daee908",
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    }
                );
        }
    }
}
