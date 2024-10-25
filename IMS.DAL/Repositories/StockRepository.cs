﻿using IMS.DTO;
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
            return await _context.Stocks.Include(s => s.Item).ToListAsync();
        }

        public async Task<Stock> GetStockByIdAsync(int id)
        {
            return await _context.Stocks.Include(s => s.Item).FirstOrDefaultAsync(s => s.stockID == id);
        }

        public async Task AddStockAsync(Stock stock)
        {
            // Ensure the ItemID is not explicitly set
            if (stock.Item != null)
            {
                stock.Item.ItemID = 0;
            }

            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStockAsync(Stock stock)
        {
            _context.Stocks.Update(stock);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStockAsync(int id)
        {
            var stock = await GetStockByIdAsync(id);
            if (stock != null)
            {
                _context.Stocks.Remove(stock);
                await _context.SaveChangesAsync();
            }
        }
    }
}