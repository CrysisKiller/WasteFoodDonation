using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IDonorRepository
    {
        Task<List<Donor>> GetAllAsync();
        Task<Donor?> GetByIdAsync(int id);
        Task<Donor> CreateDonorAsync(CreateDonorDto donorDto);
        Task<bool> DonorExists(int id);
        Task<Donor?> DeleteDonor(int id);
    }
}