using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.Service
{
    public class ExpiredDonationsCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        // private readonly TimeSpan _checkInterval = TimeSpan.FromHours(1); 
        private readonly TimeSpan _checkInterval = TimeSpan.FromSeconds(5);
        private readonly ILogger<ExpiredDonationsCleanupService> _logger;

        public ExpiredDonationsCleanupService(IServiceProvider serviceProvider, ILogger<ExpiredDonationsCleanupService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;

        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var donorService = scope.ServiceProvider.GetRequiredService<IDonorService>();
                        await donorService.RemoveExpiredDonationsAsync();
                    }

                    // Log a message indicating the background service is running
                    _logger.LogInformation("Expired donations check executed at {Time}", DateTimeOffset.Now);

                    await Task.Delay(_checkInterval, stoppingToken);
                }
                catch (Exception ex)
                {
                    // Log any exceptions that occur
                    _logger.LogError(ex, "An error occurred while removing expired donations.");
                }
            }
        }
    }
}