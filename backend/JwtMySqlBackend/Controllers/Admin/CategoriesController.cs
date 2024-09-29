using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.Admin;


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

    // GET: api/Categories/5
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

    // PUT: api/Categories/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCategory(int id, Category category)
    {
        if (id != category.Id)
        {
            return BadRequest();
        }

        appContext.Entry(category).State = EntityState.Modified;

        try
        {
            await appContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CategoryExists(id))
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

    // POST: api/Categories
    [HttpPost]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        appContext.Categories.Add(category);
        await appContext.SaveChangesAsync();

        return CreatedAtAction("GetCategory", new { id = category.Id }, category);
    }

    // DELETE: api/Categories/5
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

        return NoContent();
    }

    private bool CategoryExists(int id)
    {
        return appContext.Categories.Any(e => e.Id == id);
    }
}
