using api.Models;

namespace api.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Donor>> GetUserPortfolio(AppUser user);
        Task<Portfolio?>GetPortfolioById(int DonorId);
        Task<Portfolio> CreateAsync(Portfolio portfolio);
    }
}