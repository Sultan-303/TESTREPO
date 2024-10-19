using System.ComponentModel.DataAnnotations;

namespace IMS.DTO
{
    public class Item
    {
        public int ItemID { get; set; }

        [Required]
        [StringLength(100)]
        public string ItemName { get; set; }

        [Range(0, int.MaxValue)]
        public int QuantityInStock { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }
    }
}