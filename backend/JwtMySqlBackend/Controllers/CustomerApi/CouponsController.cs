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
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons(int customerId)
    {
        return appContext.Coupons.Where(c => c.Purchases.Contains(customerId)).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Coupon>> GetCoupon(int id)
    {
        var coupon = await appContext.Coupons.FindAsync(id);

        if (coupon == null)
        {
            return NotFound();
        }

        return coupon;
    }


    [HttpPut]
    public IActionResult Buy(int customerId, int couponId)
    {
        Coupon? coupon = appContext.Coupons.Where(coupon => coupon.Id == couponId).FirstOrDefault();

        if (coupon is null)
            return NotFound();

        coupon.Purchases ??= new();

        if (coupon.Purchases.Exists(id => id == couponId))
            return Conflict();

        coupon.Purchases.Add(customerId);
        coupon.Amount--;

        appContext.Entry(coupon).CurrentValues.SetValues(coupon);
        appContext.SaveChanges();

        return Ok();
    }

}
