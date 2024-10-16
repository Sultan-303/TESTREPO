using IMS.DAL;
using IMS.DAL.Repositories;
using IMS.BLL.Services;
using IMS.Interfaces.Interfaces;
using Microsoft.EntityFrameworkCore;
using IMS.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // URL of React app
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductService, ProductService>(); // BLL
builder.Services.AddScoped<IProductRepository, ProductRepository>(); // DAL

// Add the DbContext
builder.Services.AddDbContext<IMSContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
