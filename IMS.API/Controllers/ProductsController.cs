using IMS.Interfaces;
using IMS.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace IMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        // Constructor injection of the ProductService
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/products
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _productService.GetAllProducts();
            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }
            _productService.AddProduct(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            if (product == null || product.Id != id)
            {
                return BadRequest();
            }

            var existingProduct = _productService.GetProductById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            _productService.UpdateProduct(product);
            return NoContent();
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }

            _productService.DeleteProduct(id);
            return NoContent();
        }
    }
}
