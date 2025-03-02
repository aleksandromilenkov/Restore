using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Entites;

namespace RestoreAPI.Data
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope(); // because DependencyInjection can't be used before app.Run(), we must take app.Services.CreateScope which then takes ServiceProvider and then takes the Database
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to retreive store context");
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
                ?? throw new InvalidOperationException("Failed to retreive user manager");
            
            SeedData(context, userManager);
        }

        private static async void SeedData(StoreContext context, UserManager<User> userManager)
        {
            // this will always be called Database.Migrate(): 
            context.Database.Migrate(); // if doesn't have the DB it will create the DB and apply all the pending migrations

            if (!userManager.Users.Any()) {
                var user = new User
                {
                    UserName = "asd@asd.com",
                    Email = "asd@asd.com",
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin@admin.com",
                    Email = "admin@admin.com",
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }
            if (context.Products.Any()) return;
            var products = new List<Product>
            {
               new Product
                {
                    Name = "Nike Speedster Board 2000",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/sb-nike1.png",
                    Brand = "Nike",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Nike Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products/sb-nike2.png",
                    Brand = "Nike",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Timberland Board Speed Rush 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/sb-timberland1.png",
                    Brand = "Timberland",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Timberland Super Board",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-timberland2.png",
                    Brand = "Timberland",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Napapiri Board Super Whizzy Fast",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/sb-napapiri1.png",
                    Brand = "Napapiri",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "The North Face Entry Board",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products/sb-theNorthFace1.png",
                    Brand = "The North Face",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Timberland Blue Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/hat-timberland1.png",
                    Brand = "Timberland",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Napapiri Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/hat-napapiri1.png",
                    Brand = "Napapiri",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple Napapiri Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/hat-napapiri2.png",
                    Brand = "Napapiri",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Jack Wolfskin Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/glove-jackWolfskin1.png",
                    Brand = "Jack Wolfskin",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Jack Wolfskin Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/glove-jackWolfskin2.png",
                    Brand = "Jack Wolfskin",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple Napapiri Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/glove-napapiri1.png",
                    Brand = "Napapiri",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Napapiri Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/glove-napapiri2.png",
                    Brand = "Napapiri",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Columbia Red Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/boot-columbia1.png",
                    Brand = "Columbia",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Timberland Red Boots",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/boot-timberland2.png",
                    Brand = "Timberland",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Timberland Purple Boots",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureUrl = "/images/products/boot-timberland1.png",
                    Brand = "Timberland",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Nike Purple Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-nike2.png",
                    Brand = "Nike",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Nike Blue Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/boot-nike1.png",
                    Brand = "Nike",
                    Type = "Boots",
                    QuantityInStock = 100
                },
            };
            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
