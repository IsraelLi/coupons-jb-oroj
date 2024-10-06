using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtMySqlBackend.Controllers.CompanyApi;


[Authorize(Policy = "CompanyPolicy")]
[Route("companyApi/coupons")]
[ApiController]
public class CouponsController(AppDbContext appContext) : ControllerBase
{
    /// <summary>
    /// Get *MY* coupons
    /// </summary>
    /// <returns> return only coupons of the company</returns>
    [HttpGet("{companyEmail}")]
    public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons(string companyEmail)
    {
        Company? company = appContext.Companies.Where(company => company.Email == companyEmail).FirstOrDefault();

        return appContext.Coupons.Where(coupon => coupon.CompanyId == company.Id).ToList();
    }

    [HttpPut]
    public IActionResult Update(Coupon updatedData)
    {
        Coupon? coupon = appContext.Coupons.Where(coupon => coupon.Id == updatedData.Id).FirstOrDefault();

        if (coupon is null)
            return NotFound();

        var myCoupons = appContext.Coupons.Where(c => c.CompanyId == coupon.CompanyId).ToList();

        appContext.Entry(coupon).CurrentValues.SetValues(updatedData);
        appContext.SaveChanges();

        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<Coupon>> PostCoupon(Coupon coupon)
    {
        var myCoupons = appContext.Coupons.Where(c => c.CompanyId == coupon.CompanyId).ToList();

        // Avoid same coupon title
        if (myCoupons is not null && myCoupons.FirstOrDefault(c => c.Title == coupon.Title) != null)
            return Conflict();

        appContext.Coupons.Add(coupon);
        await appContext.SaveChangesAsync();

        return CreatedAtAction("GetCoupon", new { id = coupon.Id }, coupon);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCoupon(int id)
    {
        var coupon = await appContext.Coupons.FindAsync(id);

        if (coupon == null)
        {
            return NotFound();
        }

        appContext.Coupons.Remove(coupon);
        await appContext.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Get purchases
    /// </summary>
    /// <returns> return purchases of the given coupon</returns>
    [HttpGet("purchases/{couponId}")]
    public async Task<ActionResult<IEnumerable<Customer>>> GetPurchases(int couponId)
    {
        Coupon? coupon = appContext.Coupons.Where(c => c.Id == couponId).FirstOrDefault();

        return appContext.Customers.Where(customer => coupon.Purchases.Contains(customer.Id)).ToList();
    }
}
