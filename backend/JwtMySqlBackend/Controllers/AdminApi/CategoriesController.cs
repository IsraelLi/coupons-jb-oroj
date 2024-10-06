using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.AdminApi;


[Authorize(Policy = "AdminPolicy")]
[Route("adminApi/categories")]
[ApiController]
public class CategoriesController(AppDbContext appContext) : ControllerBase
{

    // GET: api/Categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await appContext.Categories.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        var category = await appContext.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        return category;
    }

    [HttpPut]
    public IActionResult Update(Category updatedData)
    {
        Category? category = appContext.Categories.Where(category => category.Id == updatedData.Id).FirstOrDefault();

        if (category is null)
            return NotFound();

        appContext.Entry(category).CurrentValues.SetValues(updatedData);
        appContext.SaveChanges();

        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        appContext.Categories.Add(category);
        await appContext.SaveChangesAsync();

        return CreatedAtAction("GetCategory", new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await appContext.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        appContext.Categories.Remove(category);
        await appContext.SaveChangesAsync();

        return Ok();
    }
}
