namespace IMS.DTO
{
    public class Stock
    {
        public int stockID { get; set; }
        public int itemID { get; set; }
        public int quantityInStock { get; set; }
        public DateTime arrivalDate { get; set; }
        public DateTime? expiryDate { get; set; } // Nullable

        // Navigation property
        public Item Item { get; set; }
    }
}