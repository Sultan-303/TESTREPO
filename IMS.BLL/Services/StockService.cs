using IMS.DTO;
using IMS.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.BLL.Services
{
    public class StockService : IStockService
    {
        private readonly IStockRepository _stockRepository;
        private readonly ILogger<StockService> _logger;

        public StockService(IStockRepository stockRepository, ILogger<StockService> logger)
        {
            _stockRepository = stockRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Stock>> GetAllStockAsync()
        {
            try
            {
                return await _stockRepository.GetAllStockAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetAllStockAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Stock> GetStockByIdAsync(int id)
        {
            try
            {
                return await _stockRepository.GetStockByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetStockByIdAsync: {ex.Message}");
                throw;
            }
        }

        public async Task AddStockAsync(Stock stock)
        {
            if (stock == null)
            {
                _logger.LogWarning("Received null stock object");
                throw new ArgumentNullException(nameof(stock), "Stock is null.");
            }

            try
            {
                await _stockRepository.AddStockAsync(stock);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in AddStockAsync: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateStockAsync(Stock stock)
        {
            if (stock == null)
            {
                _logger.LogWarning("Received null stock object");
                throw new ArgumentNullException(nameof(stock), "Stock is null.");
            }

            try
            {
                await _stockRepository.UpdateStockAsync(stock);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in UpdateStockAsync: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteStockAsync(int id)
        {
            try
            {
                await _stockRepository.DeleteStockAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in DeleteStockAsync: {ex.Message}");
                throw;
            }
        }
    }
}