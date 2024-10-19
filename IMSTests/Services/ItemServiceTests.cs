using IMS.BLL.Services;
using IMS.DTO;
using IMS.Interfaces;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace IMS.Tests.Services
{
    public class ItemServiceTests
    {
        private readonly Mock<IItemRepository> _mockItemRepository;
        private readonly ItemService _itemService;

        public ItemServiceTests()
        {
            _mockItemRepository = new Mock<IItemRepository>();
            _itemService = new ItemService(_mockItemRepository.Object);
        }

        [Fact]
public async Task GetAllItemsAsync_ReturnsAllItems()
{
    // Arrange
    var items = new List<Item>
    {
        new Item { ItemID = 1, ItemName = "Item1", QuantityInStock = 10, Price = 100 },
        new Item { ItemID = 2, ItemName = "Item2", QuantityInStock = 20, Price = 200 }
    };
    _mockItemRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(items);

    // Act
    var result = await _itemService.GetAllItemsAsync();

    // Convert result to a List to allow indexing
    var resultList = result.ToList();

    // Assert
    Assert.NotNull(resultList); // Ensure result is not null
    Assert.Equal(2, resultList.Count); // Check that we got 2 items

    // Assert individual properties of the first item
    Assert.Equal(1, resultList[0].ItemID);
    Assert.Equal("Item1", resultList[0].ItemName);
    Assert.Equal(10, resultList[0].QuantityInStock);
    Assert.Equal(100, resultList[0].Price);

    // Assert individual properties of the second item
    Assert.Equal(2, resultList[1].ItemID);
    Assert.Equal("Item2", resultList[1].ItemName);
    Assert.Equal(20, resultList[1].QuantityInStock);
    Assert.Equal(200, resultList[1].Price);
}


        // Add more tests for other methods
    }
}