using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.Admin;


[Authorize(Policy = "AdminPolicy")]
[Route("adminApi/customers")]
[ApiController]
public class CustomersController(AppDbContext appContext) : ControllerBase
{

    // GET: api/Customers
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
    {
        return await appContext.Customers.ToListAsync();
    }

    // GET: api/Customers/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetCustomer(int id)
    {
        var customer = await appContext.Customers.FindAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        return customer;
    }

    // PUT: api/Customers/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCustomer(int id, Customer customer)
    {
        if (id != customer.Id)
        {
            return BadRequest();
        }

        appContext.Entry(customer).State = EntityState.Modified;

        try
        {
            await appContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CustomerExists(id))
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

    // POST: api/Customers
    [HttpPost]
    public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
    {
        appContext.Customers.Add(customer);
        await appContext.SaveChangesAsync();

        return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
    }

    // DELETE: api/Customers/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var customer = await appContext.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }

        appContext.Customers.Remove(customer);
        await appContext.SaveChangesAsync();

        return NoContent();
    }

    private bool CustomerExists(int id)
    {
        return appContext.Customers.Any(e => e.Id == id);
    }
}
