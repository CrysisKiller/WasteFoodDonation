using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio?> GetPortfolioById(int DonorId)
        {
            var portfolio = await _context.Portfolios.FirstOrDefaultAsync(port => port.DonorId == DonorId);
            if(portfolio==null)
                return null;
            return portfolio;                
        }

        public async Task<List<Donor>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(u => u.AppUserId == user.Id).Select(donor => new Donor
            {
                Id = donor.DonorId,
                address = donor.donor.address,
                CreatedOn = donor.donor.CreatedOn,
                ExpDate = donor.donor.ExpDate,
                FoodType = donor.donor.FoodType,
                FoodDetails = donor.donor.FoodDetails,
                Description = donor.donor.Description
            })
            .ToListAsync()
            .ContinueWith(task => task.Result.OrderBy(d => d.ExpDate - d.CreatedOn).ToList());
        }
        
    }
}

