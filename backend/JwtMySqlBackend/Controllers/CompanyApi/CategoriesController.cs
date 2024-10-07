using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.CompanyApi;


[Authorize(Policy = "CompanyPolicy")]
[Route("CompanyApi/categories")]
[ApiController]
public class CategoriesController(AppDbContext appContext) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await appContext.Categories.ToListAsync();
    }

}
