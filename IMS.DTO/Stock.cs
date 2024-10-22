namespace IMS.DTO
{
    public class Stock
    {
        public int StockID { get; set; }
        public int ItemID { get; set; }
        public int QuantityInStock { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime? ExpiryDate { get; set; } // Nullable

        // Navigation property
        public Item Item { get; set; }
    }
}