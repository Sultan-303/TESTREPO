using IMS.DTO;
using IMS.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.DAL.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly IMSContext _context;
        private readonly ILogger<ItemRepository> _logger;

        public ItemRepository(IMSContext context, ILogger<ItemRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            try
            {
                return await _context.Items.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetAllItemsAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Item> GetItemByIdAsync(int id)
        {
            try
            {
                return await _context.Items.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetItemByIdAsync: {ex.Message}");
                throw;
            }
        }

        public async Task AddItemAsync(Item item)
        {
            try
            {
                await _context.Items.AddAsync(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in AddItemAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> ItemNameExistsAsync(string itemName)
{
    try
    {
        return await _context.Items.AnyAsync(i => i.ItemName == itemName);
    }
    catch (Exception ex)
    {
        _logger.LogError($"Error in ItemNameExistsAsync: {ex.Message}");
        throw;
    }
}

        public async Task UpdateItemAsync(Item item)
        {
            try
            {
                _context.Items.Update(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in UpdateItemAsync: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteItemAsync(int id)
        {
            try
            {
                var item = await GetItemByIdAsync(id);
                if (item != null)
                {
                    _context.Items.Remove(item);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in DeleteItemAsync: {ex.Message}");
                throw;
            }
        }
    }
}