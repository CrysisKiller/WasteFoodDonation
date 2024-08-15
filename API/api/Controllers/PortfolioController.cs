using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    [Authorize]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IDonorRepository _donorRepo;
        private readonly IPortfolioRepository _portfolioRepo;

        public PortfolioController(UserManager<AppUser> userManager, IDonorRepository donorRepo, IPortfolioRepository portfolioRepo)
        {
            _userManager = userManager;
            _donorRepo = donorRepo;
            _portfolioRepo = portfolioRepo;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            var users = userPortfolio.Select(u => u.ToDonorDto()).ToList();
            return Ok(users);
        }


        [HttpPost("{donorId}")]
        [Authorize]

        public async Task<IActionResult> AddPortfolio([FromRoute]int donorId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var donor = await _donorRepo.GetByIdAsync(donorId);

            if(appUser==null)
                return BadRequest("Appuser empty");
            if (donor == null)
                return BadRequest($"Donor not found {donorId}");

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            if(userPortfolio.Any(e =>e.Id.Equals(donorId)))
                return BadRequest("Cannot add the same stock to portfolio ");      

            var portfolioModel = new Portfolio
            {
                DonorId = donor.Id,
                AppUserId = appUser.Id,                
            };

            var create = await _portfolioRepo.CreateAsync(portfolioModel);

            if (create == null)
                return StatusCode(500, "Unable to Create");

            return Created();
        }
        [HttpGet("{donorId}")]
        public async Task<IActionResult> getPortfolioByID([FromRoute] int donorId){
           var portfolio= await _portfolioRepo.GetPortfolioById(donorId);
           if(portfolio==null)
            return NotFound();
           return Ok(portfolio);  
        }
    }
}