using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.CustomerApi;


[Authorize(Policy = "CustomerPolicy")]
[Route("customerApi/coupons")]
[ApiController]
public class CouponsController(AppDbContext appContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
    {
        return await appContext.Coupons.ToListAsync();
    }

    /// <summary>
    /// Get *MY* coupons
    /// </summary>
    /// <returns> return only coupons the customer purchased </returns>
    [HttpGet("{customerEmail}")]
    public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons(string customerEmail)
    {
        Customer? customer = appContext.Customers.Where(customer => customer.Email == customerEmail).FirstOrDefault();
        var allCoupons = await appContext.Coupons.ToListAsync();

        return allCoupons.Where(c => c.Purchases != null && c.Purchases.Contains(customer.Id)).ToList();
    }

    [HttpPut]
    public IActionResult Buy([FromQuery] string customerEmail, [FromQuery] int couponId)
    {
        Customer? customer = appContext.Customers.Where(customer => customer.Email == customerEmail).FirstOrDefault();
        Coupon? coupon = appContext.Coupons.Where(coupon => coupon.Id == couponId).FirstOrDefault();

        if (coupon is null)
            return NotFound();

        coupon.Purchases ??= new();

        if (coupon.Purchases.Exists(id => id == customer.Id))
            return Conflict();

        coupon.Purchases.Add(customer.Id);
        coupon.Amount--;

        appContext.Entry(coupon).CurrentValues.SetValues(coupon);
        appContext.SaveChanges();

        return Ok();
    }

}
