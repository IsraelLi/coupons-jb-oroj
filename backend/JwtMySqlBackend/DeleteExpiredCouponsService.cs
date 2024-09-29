namespace JwtMySqlBackend;

using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using JwtMySqlBackend.Data;

public class DeleteExpiredCouponsService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public DeleteExpiredCouponsService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await DeleteExpiredCoupons();
            // Wait for the next day (24 hours) before running the task again
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }
    }

    private async Task DeleteExpiredCoupons()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var currentDate = DateTime.UtcNow;

            // Delete expired coupons
            var expiredCoupons = await dbContext.Coupons
                .Where(c => c.EndDate < currentDate)
                .ToListAsync();

            dbContext.Coupons.RemoveRange(expiredCoupons);
            await dbContext.SaveChangesAsync();
        }
    }
}
