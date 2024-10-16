using IMS.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using IMS.Interfaces.Interfaces;

namespace IMS.DAL.Repositories
{
    public class ProductRepository :  IProductRepository
    {
        private readonly IMSContext _context;

        public ProductRepository(IMSContext context)
        {
            _context = context;
        }

        public IEnumerable<Product> GetAll()
        {
            return _context.Products.ToList(); // Use EF Core to fetch products from the database
        }

        public Product GetById(int id)
        {
            return _context.Products.Find(id); // Use EF Core to find a product by its ID
        }

        public void Add(Product product)
        {
            _context.Products.Add(product); // Use EF Core to add a new product
            _context.SaveChanges(); // Save changes to the database
        }

        public void Update(Product product)
        {
            _context.Products.Update(product); // Use EF Core to update an existing product
            _context.SaveChanges(); // Save changes to the database
        }

        public void Delete(int id)
        {
            var product = GetById(id); // Find the product by its ID
            _context.Products.Remove(product); // Use EF Core to remove the product
            _context.SaveChanges(); // Save changes to the database
        }
    }
}
