using JwtMySqlBackend.Data;
using JwtMySqlBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtMySqlBackend.Controllers.Admin;

[Authorize(Policy = "AdminPolicy")]
[ApiController]
[Route("adminApi/companies")]
public class CompanyController(AppDbContext appContext) : ControllerBase
{

    [HttpGet]
    public IActionResult GetAll()
    {
        List<Company> compaines = [.. appContext.Companies];
        return Ok(compaines);
    }

    [HttpGet("{Id}")]
    public IActionResult GetById([FromRoute] int Id)
    {
        Company? company = appContext.Companies.Where(company => company.Id == Id).FirstOrDefault();
        if (company is not null)
            return Ok(company);

        return NotFound();
    }

    [HttpPut]
    public IActionResult Update(Company updatedData)
    {
        Company? company = appContext.Companies.Where(company => company.Id == updatedData.Id).FirstOrDefault();

        if (company is null)
            return NotFound();

        appContext.Entry(company).CurrentValues.SetValues(updatedData);
        appContext.SaveChanges();

        return Ok();
    }

    [HttpPost]
    public IActionResult AddCompany(Company company)
    {
        appContext.Companies.Add(company);
        appContext.SaveChanges();
        return CreatedAtAction("GetById", new { id = company.Id }, company);
    }

    [HttpDelete("{Id}")]
    public IActionResult Delete([FromRoute] int Id)
    {
        Company? company = appContext.Companies.Where(company => company.Id == Id).FirstOrDefault();

        if (company is null)
            return NotFound();

        appContext.Companies.Remove(company);
        appContext.SaveChanges();
        return Ok();
    }
}
