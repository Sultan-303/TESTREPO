using IMS.DTO;
using IMS.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace IMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly IStockService _stockService;

        public StockController(IStockService stockService)
        {
            _stockService = stockService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStock()
        {
            try
            {
                var stock = await _stockService.GetAllStockAsync();
                return Ok(stock);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetAllStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStockById(int id)
        {
            try
            {
                var stock = await _stockService.GetStockByIdAsync(id);
                if (stock == null)
                {
                    return NotFound();
                }
                return Ok(stock);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in GetStockById: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddStock([FromBody] Stock stock)
        {
            if (stock == null)
            {
                return BadRequest("Stock is null.");
            }

            try
            {
                await _stockService.AddStockAsync(stock);
                return CreatedAtAction(nameof(GetStockById), new { id = stock.StockID }, stock);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in AddStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStock(int id, [FromBody] Stock stock)
        {
            if (id != stock.StockID)
            {
                return BadRequest("Stock ID mismatch.");
            }

            if (stock == null)
            {
                return BadRequest("Stock is null.");
            }

            try
            {
                await _stockService.UpdateStockAsync(stock);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in UpdateStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            try
            {
                await _stockService.DeleteStockAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in DeleteStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}