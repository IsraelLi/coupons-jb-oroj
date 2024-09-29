using JwtMySqlBackend.Models;

namespace JwtMySqlBackend.DTOs
{
    public class CouponDto
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Amount { get; set; }

        public double Price { get; set; }

        public string? Image { get; set; }

        public int CategoryId { get; set; }

        public int CompanyId { get; set; }
    }
}
