using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.Service
{
    public class DonorService : IDonorService
    {
        private readonly IDonorRepository _donorRepo;
        private readonly ILogger<DonorService> _logger;

        public DonorService(IDonorRepository donorRepository, ILogger<DonorService> logger)
        {
            _donorRepo = donorRepository;
            _logger = logger;
        }

        public async Task RemoveExpiredDonationsAsync()
        {
            var currentDateTime = DateTime.Now;
            _logger.LogInformation("Starting removal of expired donations.");

            var donors = await _donorRepo.GetAllAsync();
            if (!donors.Any())
            {
                _logger.LogInformation("No donors found. Skipping removal process.");
                return; // Exit the method if there are no donors
            }
            var expiredDonors = donors
                .Where(d => d.ExpDate.Date == currentDateTime.Date && d.ExpDate <= currentDateTime)
                .ToList();

            _logger.LogInformation($"Found {expiredDonors.Count} expired donors.");

            foreach (var donor in expiredDonors)
            {
                await _donorRepo.DeleteDonor(donor.Id);
                _logger.LogInformation($"Deleted donor with ID: {donor.Id}");
            }
        }

    }
}