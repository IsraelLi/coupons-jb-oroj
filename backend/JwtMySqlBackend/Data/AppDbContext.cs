using JwtMySqlBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Data;

public class AppDbContext : DbContext
{

    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<CustomerVsCoupon> CustomersVsCoupons { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("server=localhost;database=CouponDatabase;user=root;password=root");
    }
}
