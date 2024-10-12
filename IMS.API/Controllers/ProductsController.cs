using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace IMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // Temporary in-memory list of products (later you can connect this to your database)
        private static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Price = 1200.99M },
            new Product { Id = 2, Name = "Phone", Price = 799.99M },
            new Product { Id = 3, Name = "Tablet", Price = 450.00M }
        };

        // GET: api/products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(products);
        }
    }

    // A simple model class representing a product
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
