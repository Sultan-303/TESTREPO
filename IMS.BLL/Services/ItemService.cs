using IMS.DTO;
using IMS.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

// ItemService.cs
namespace IMS.BLL.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            return await _itemRepository.GetAllItemsAsync();
        }

        public async Task<Item> GetItemByIdAsync(int id)
        {
            return await _itemRepository.GetItemByIdAsync(id);
        }

        public async Task AddItemAsync(Item item)
        {
            await _itemRepository.AddItemAsync(item);
        }

        public async Task UpdateItemAsync(Item item)
        {
            await _itemRepository.UpdateItemAsync(item);
        }

        public async Task DeleteItemAsync(int id)
        {
            await _itemRepository.DeleteItemAsync(id);
        }
    }
}
