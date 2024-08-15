using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Address;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Controllers
{
    [Route("api/address")]
    [ApiController]
    [Authorize]

    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _addressRepo;
        private readonly IDonorRepository _donorRepo;
         public readonly UserManager<AppUser> _userManager;

        public AddressController(IAddressRepository addressRepo, IDonorRepository donorRepo,UserManager<AppUser> userManager)
        {
            _addressRepo = addressRepo;
            _donorRepo = donorRepo;
            _userManager=userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var address = await _addressRepo.GetAllAsync();
            if (address == null)
                return NotFound("The Database is empty");

            var addressDto = address.Select(a => a.ToAddressDto());
            return Ok(addressDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var address = await _addressRepo.GetByIdAsync(id);
            if (address == null)
                return NotFound("address Not Found");
            return Ok(address.ToAddressDto());
        }

        [HttpPost("{DonorId}")]
        public async Task<IActionResult> Createaddress([FromBody] CreateAdddressNewDto addressDto, [FromRoute] int DonorId)
        {
            if (!await _donorRepo.DonorExists(DonorId))
                return NotFound("Donor Does not exist");
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var address = addressDto.ToCreateAddressDto(DonorId);

            address.AppUserId = appUser.Id;

            var address1 = await _addressRepo.CreateAsync(address);
            return CreatedAtAction(nameof(GetById), new { id = address.Id }, address.ToAddressDto());
        }

    }
}