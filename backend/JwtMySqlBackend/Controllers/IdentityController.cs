using JwtMySqlBackend.Contracts.Requests;
using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtMySqlBackend.Controllers;

[Route("/auth")]
[ApiController]
public class IdentityController(AppDbContext appDbContext) : ControllerBase
{
    private const string TokenSecret = "SuperSekretKey1234090000000000000";
    private const string Audience = "israel.net";
    private const string Issuer = "israel.net";

    private static readonly string[] UserTypes = ["Customer", "Company", "Admin"];

    [HttpPost("token")]
    public IActionResult GenerateToken([FromBody] TokenRequest request)
    {
        if (!UserTypes.Contains(request.Type))
            return BadRequest($"Invalid user type: {request.Type}");

        if (!IsAuthorized(request.Email, request.Password, request.Type))
            return Unauthorized($"Invalid Credentials for type {request.Type}");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(TokenSecret);

        List<Claim> claims = [
            new(JwtRegisteredClaimNames.Iss, Issuer),
            new(JwtRegisteredClaimNames.Email, request.Email),
            new("type", request.Type)
            ];

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(30),
            Audience = Audience,
            Issuer = Issuer,
            SigningCredentials = new(new SymmetricSecurityKey(key), "HS256")
        };

        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        string jwt = tokenHandler.WriteToken(token);

        return Ok(jwt);
    }

    private bool IsAuthorized(string email, string password, string type)
    {
        if (type == "Customer")
        {
            Customer? customer = appDbContext.Customers.Where(u => u.Email == email).FirstOrDefault();
            if (customer != null && customer.Password == password)
                return true;
        }
        else if (type == "Company")
        {
            Company? company = appDbContext.Companies.Where(u => u.Email == email).FirstOrDefault();
            if (company != null && company.Password == password)
                return true;
        }
        else if (type == "Admin")
        {
            if (email == "admin@admin.com" && password == "admin")
                return true;
        }
        return false;
    }

}
