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

    [HttpPut]
    public IActionResult Update(Customer updatedData)
    {
        Customer? customer = appContext.Customers.Where(customer => customer.Id == updatedData.Id).FirstOrDefault();

        if (customer is null)
            return NotFound();

        appContext.Entry(customer).CurrentValues.SetValues(updatedData);
        appContext.SaveChanges();

        return Ok();
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
