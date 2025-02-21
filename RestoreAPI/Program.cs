using Microsoft.EntityFrameworkCore;
using RestoreAPI.Data;
using RestoreAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(options =>
{
    options
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("https://localhost:3000");
});
app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
