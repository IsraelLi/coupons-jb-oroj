using JwtMySqlBackend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var appConfig = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidIssuer = appConfig["JwtSettings:Issuer"],
            ValidAudience = appConfig["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appConfig["JwtSettings:Key"]!)),

            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});



builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AdminPolicy", p => p.RequireClaim("type", "Admin"));

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("CompanyPolicy", p => p.RequireClaim("type", "Company"));

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("CustomerPolicy", p => p.RequireClaim("type", "Customer"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowLocalhost3000");
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
