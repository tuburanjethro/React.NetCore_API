using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBPractice.Models
{
    public class OnboardingContext: DbContext
    {
        public OnboardingContext(DbContextOptions<OnboardingContext> options) : base(options)
        { }
        
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Store> Store { get; set; }
        public DbSet<Sale> Sales { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sale>()
                .HasKey(s => s.Id);

            //modelBuilder.Entity<Sale>()
                //.HasKey(s => new { s.ProductId, s.CustomerId, s.StoreId });

            modelBuilder.Entity<Sale>()
                    .HasOne(s => s.Customer)
                    .WithMany(s => s.ProductSold)
                    .HasForeignKey(s => s.CustomerId);

            modelBuilder.Entity<Sale>()
                    .HasOne(s => s.Product)
                    .WithMany(s => s.ProductSold)
                    .HasForeignKey(s => s.ProductId);

            modelBuilder.Entity<Sale>()
                .HasOne(s => s.Store)
                .WithMany(s => s.ProductSold)
                .HasForeignKey(s => s.StoreId);
        }
    }
}
