using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Address;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        public readonly ApplicationDBContext _context;

        public AddressRepository(ApplicationDBContext context)
        {
            _context=context;
        }

        public async Task<List<Address>> GetAllAsync()
        {
            return await _context.Address.Include(a => a.AppUser).ToListAsync();
        }

        public async Task<Address?> GetByIdAsync(int id)
        {
            var address = await  _context.Address.Include(a => a.AppUser).FirstOrDefaultAsync(a => a.Id == id);
            if(address == null)
                return null;
            return address;        
        }
        public async Task<Address> CreateAsync(Address address)
        {
            await _context.Address.AddAsync(address);
            await _context.SaveChangesAsync();
            return address;        
        }
    }
}