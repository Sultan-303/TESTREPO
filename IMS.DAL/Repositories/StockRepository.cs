using IMS.DTO;
using IMS.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.DAL.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly IMSContext _context;

        public StockRepository(IMSContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Stock>> GetAllStockAsync()
        {
            return await _context.Stocks.Include(s => s.Item).ToListAsync(); // Updated to use "Stocks"
        }

        public async Task<Stock> GetStockByIdAsync(int id)
        {
            return await _context.Stocks.Include(s => s.Item).FirstOrDefaultAsync(s => s.StockID == id); // Updated to use "Stocks"
        }

        public async Task AddStockAsync(Stock stock)
        {
            await _context.Stocks.AddAsync(stock); // Updated to use "Stocks"
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStockAsync(Stock stock)
        {
            _context.Stocks.Update(stock); // Updated to use "Stocks"
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStockAsync(int id)
        {
            var stock = await GetStockByIdAsync(id);
            if (stock != null)
            {
                _context.Stocks.Remove(stock); // Updated to use "Stocks"
                await _context.SaveChangesAsync();
            }
        }
    }
}