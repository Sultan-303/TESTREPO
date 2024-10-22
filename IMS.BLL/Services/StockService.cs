using IMS.DTO;
using IMS.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.BLL.Services
{
    public class StockService : IStockService
    {
        private readonly IStockRepository _stockRepository;

        public StockService(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<IEnumerable<Stock>> GetAllStockAsync()
        {
            return await _stockRepository.GetAllStockAsync();
        }

        public async Task<Stock> GetStockByIdAsync(int id)
        {
            return await _stockRepository.GetStockByIdAsync(id);
        }

        public async Task AddStockAsync(Stock stock)
        {
            await _stockRepository.AddStockAsync(stock);
        }

        public async Task UpdateStockAsync(Stock stock)
        {
            await _stockRepository.UpdateStockAsync(stock);
        }

        public async Task DeleteStockAsync(int id)
        {
            await _stockRepository.DeleteStockAsync(id);
        }
    }
}
