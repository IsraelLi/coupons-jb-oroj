using System.ComponentModel.DataAnnotations.Schema;

namespace JwtMySqlBackend.Models;

public class Coupon
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int Amount { get; set; }

    public double Price { get; set; }

    public string? Image { get; set; }

    [ForeignKey("Category")]
    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    [ForeignKey("Company")]
    public int CompanyId { get; set; }

    public Company? Company { get; set; }
}
