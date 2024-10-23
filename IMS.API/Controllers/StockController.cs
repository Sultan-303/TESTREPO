using IMS.DTO;
using IMS.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace IMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly IStockService _stockService;
        private readonly ILogger<StockController> _logger;

        public StockController(IStockService stockService, ILogger<StockController> logger)
        {
            _stockService = stockService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStock()
        {
            try
            {
                _logger.LogInformation("Fetching all stock");
                var stock = await _stockService.GetAllStockAsync();
                return Ok(stock);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetAllStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStockById(int id)
        {
            try
            {
                _logger.LogInformation($"Fetching stock with ID: {id}");
                var stock = await _stockService.GetStockByIdAsync(id);
                if (stock == null)
                {
                    return NotFound();
                }
                return Ok(stock);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetStockById: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddStock([FromBody] Stock stock)
        {
            if (stock == null)
            {
                _logger.LogWarning("Received null stock object");
                return BadRequest("Stock is null.");
            }

            try
            {
                _logger.LogInformation("Adding new stock");
                await _stockService.AddStockAsync(stock);
                return CreatedAtAction(nameof(GetStockById), new { id = stock.stockID }, stock);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in AddStock: {ex.Message}");
                _logger.LogError($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStock(int id, [FromBody] Stock stock)
        {
            if (id != stock.stockID)
            {
                return BadRequest("Stock ID mismatch.");
            }

            if (stock == null)
            {
                return BadRequest("Stock is null.");
            }

            try
            {
                _logger.LogInformation($"Updating stock with ID: {id}");
                await _stockService.UpdateStockAsync(stock);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in UpdateStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            try
            {
                _logger.LogInformation($"Deleting stock with ID: {id}");
                await _stockService.DeleteStockAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in DeleteStock: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}