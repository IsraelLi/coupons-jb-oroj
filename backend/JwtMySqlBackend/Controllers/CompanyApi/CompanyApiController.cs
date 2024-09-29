using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace JwtMySqlBackend.Controllers.CompanyApi;

[Authorize(Policy = "CompanyPolicy")]
[Route("/companyApi")]
[ApiController]
public class CompanyApiController(AppDbContext appContext) : ControllerBase
{

    [HttpPost("/coupons")]
    public async Task<ActionResult<Coupon>> CreateCoupon([FromBody] Coupon coupon)
    {
        JwtSecurityToken token = ExtractTokenFromRequest(Request)!;
        string? email = token.Claims
            .Where(v => v.Type == JwtRegisteredClaimNames.Email)
            .Select(v => v.Value)
            .FirstOrDefault();

        Company? company = appContext.Companies.Where(c => c.Id == coupon.CompanyId).FirstOrDefault();
        if (company == null)
            return BadRequest("Invalid Company Id");

        if (email == null)
            return BadRequest($"No Email Found in Token");

        if (email != company.Email)
            return Unauthorized($"You can't add coupon of another company");

        Coupon? existing = appContext.Coupons
            .FirstOrDefault(c => c.Title == coupon.Title && c.Id == coupon.CompanyId);

        if (existing != null)
            return BadRequest("Title already exists for this coupon");

        appContext.Coupons.Add(coupon);
        await appContext.SaveChangesAsync();

        return Ok();
    }

    private JwtSecurityToken? ExtractTokenFromRequest(HttpRequest request)
    {

        // Check if Authorization header is present
        if (request.Headers.ContainsKey("Authorization"))
        {
            var authHeader = request.Headers.Authorization.ToString();

            // JWT token usually starts with 'Bearer ', so we need to remove that prefix
            if (authHeader.StartsWith("Bearer "))
            {
                var token = authHeader["Bearer ".Length..].Trim();
                return ParseToken(token);
            }
        }
        return null;
    }

    private JwtSecurityToken? ParseToken(string token)
    {
        try
        {
            // Initialize the JwtSecurityTokenHandler
            var tokenHandler = new JwtSecurityTokenHandler();

            // Parse the JWT token from string
            var jwtToken = tokenHandler.ReadJwtToken(token);

            // Get claims (e.g., "sub", "name", etc.)
            var claims = jwtToken.Claims.Select(c => new { c.Type, c.Value }).ToList();

            // You can also access other token details like:
            var issuer = jwtToken.Issuer;
            var audience = jwtToken.Audiences;

            return jwtToken;
        }
        catch (Exception ex) 
        {
            return null;
        }
    }
}
