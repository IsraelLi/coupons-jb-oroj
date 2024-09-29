namespace JwtMySqlBackend.Models;

public class CustomerVsCoupon
{
    public int Id { get; set; }
    public Customer Customer { get; set; }
    public Coupon Coupon { get; set; }
}
