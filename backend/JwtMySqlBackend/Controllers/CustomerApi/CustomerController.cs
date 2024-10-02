using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtMySqlBackend.Controllers.CustomerApi;


[Authorize(Policy = "CustomerPolicy")]
[Route("customerApi/customers")]
[ApiController]
public class CustomerController(AppDbContext appContext) : ControllerBase
{

    // GET: customerApi/Customers/5
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

}
