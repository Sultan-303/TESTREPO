using IMS.DTO;
using IMS.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace IMS.BLL.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly ILogger<ItemService> _logger;

        public ItemService(IItemRepository itemRepository, ILogger<ItemService> logger)
        {
            _itemRepository = itemRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            try
            {
                return await _itemRepository.GetAllItemsAsync();
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
                var item = await _itemRepository.GetItemByIdAsync(id);
                if (item == null)
                {
                    _logger.LogWarning($"Item with ID {id} not found.");
                }
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetItemByIdAsync: {ex.Message}");
                throw;
            }
        }

        public async Task AddItemAsync(Item item)
        {
            if (item == null)
            {
                _logger.LogWarning("Received null item object");
                throw new ArgumentNullException(nameof(item), "Item is null.");
            }

            try
            {
                await _itemRepository.AddItemAsync(item);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in AddItemAsync: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateItemAsync(Item item)
        {
            if (item == null)
            {
                _logger.LogWarning("Received null item object");
                throw new ArgumentNullException(nameof(item), "Item is null.");
            }

            try
            {
                await _itemRepository.UpdateItemAsync(item);
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
                var item = await _itemRepository.GetItemByIdAsync(id);
                if (item == null)
                {
                    _logger.LogWarning($"Item with ID {id} not found.");
                    return;
                }
                await _itemRepository.DeleteItemAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in DeleteItemAsync: {ex.Message}");
                throw;
            }
        }
    }
}