using IMS.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace IMS.DAL
{
    public class IMSContext : DbContext
    {
        public IMSContext(DbContextOptions<IMSContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        // Additional DbSets for other entities
    }
}
