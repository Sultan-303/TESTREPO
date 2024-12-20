using IMS.DTO;
using Microsoft.EntityFrameworkCore;

namespace IMS.DAL
{
    public class IMSContext : DbContext
    {
        public IMSContext(DbContextOptions<IMSContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Stock> Stocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Specify precision and scale for the Price property
            modelBuilder.Entity<Item>()
                .Property(i => i.Price)
                .HasColumnType("decimal(18,2)");

            // Configure ArrivalDate and ExpiryDate properties for Stock
            modelBuilder.Entity<Stock>()
                .Property(s => s.ArrivalDate)
                .IsRequired();

            modelBuilder.Entity<Stock>()
                .Property(s => s.ExpiryDate)
                .IsRequired(false);

            // Configure the relationship between Stock and Item
            modelBuilder.Entity<Stock>()
                .HasOne<Item>()
                .WithMany()
                .HasForeignKey(s => s.ItemID)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading deletes
        }
    }
}