using JwtMySqlBackend.Data;
using JwtMySqlBackend.DTOs;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.Admin;


[Authorize(Policy = "AdminPolicy")]
[Route("adminApi/coupons")]
[ApiController]
public class CouponsController(AppDbContext appContext) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
    {
        return await appContext.Coupons.ToListAsync();
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

    [HttpPut("{id}")]
    public async Task<IActionResult> PutCoupon(int id, Coupon coupon)
    {
        if (id != coupon.Id)
        {
            return BadRequest();
        }

        appContext.Entry(coupon).State = EntityState.Modified;

        try
        {
            await appContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CouponExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<Coupon>> PostCoupon(Coupon coupon)
    {
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

    private bool CouponExists(int id)
    {
        return appContext.Coupons.Any(e => e.Id == id);
    }
}
