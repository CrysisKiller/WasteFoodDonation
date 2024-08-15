using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class DonorRepository : IDonorRepository
    {
        public readonly ApplicationDBContext _context;
        public DonorRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Donor>> GetAllAsync()
        {
            return await _context.Donor
            .Include(d => d.address)
            .ThenInclude(d => d.AppUser)
            .ToListAsync()
            .ContinueWith(task => task.Result.OrderBy(d => d.ExpDate - d.CreatedOn).ToList());
        }

        public async Task<Donor?> GetByIdAsync(int id)
        {
            var donor = await _context.Donor.Include(d => d.address).ThenInclude(d => d.AppUser).FirstOrDefaultAsync(d => d.Id == id);
            if (donor == null)
                return null;
            return donor;
        }

        public async Task<Donor> CreateDonorAsync(CreateDonorDto donorDto)
        {
            var donor = donorDto.ToDonorRequest();
            await _context.Donor.AddAsync(donor);
            await _context.SaveChangesAsync();
            return donor;
        }

        public async Task<bool> DonorExists(int id)
        {
            return await _context.Donor.AnyAsync(s => s.Id == id);
        }

        public async Task<Donor?> DeleteDonor(int id)
        {
            var donor = await _context.Donor.FirstOrDefaultAsync(d => d.Id == id);
            if (donor == null)
                return null;
            _context.Donor.Remove(donor);
            await _context.SaveChangesAsync();
            return donor;
        }
    }
}