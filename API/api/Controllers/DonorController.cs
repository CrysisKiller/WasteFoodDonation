using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{   
    [Route("api/donor")]
    [ApiController]
    [Authorize]

    public class DonorController : ControllerBase
    {
        public readonly IDonorRepository _donorRepo;
        public DonorController(IDonorRepository donorRepo)
        {
            _donorRepo=donorRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(){
            var donors = await _donorRepo.GetAllAsync();
            var donorsDto = donors.Select(d => d.ToDonorDto()).ToList();
            if(donors == null)
                return NotFound("The Database is empty");
            return Ok(donorsDto);
        }

        [HttpGet("{id:int}")]
         public async Task<IActionResult> GetById([FromRoute] int id){
            var donor = await _donorRepo.GetByIdAsync(id);
            if(donor == null)
                return NotFound("Donor Not Found");
            return Ok(donor.ToDonorDto());    
         }

         [HttpPost]
         public async Task<IActionResult> CreateDonor([FromBody] CreateDonorDto donorDto ){
            var donor = await _donorRepo.CreateDonorAsync(donorDto);
            return CreatedAtAction(nameof(GetById),new{id = donor.Id},donor.ToDonorDto());
         }

         [HttpDelete("{id:int}")]
         public async Task<IActionResult> DeleteDonor([FromRoute] int id){
            var donor = await _donorRepo.DeleteDonor(id);
            if(donor == null)
                return NotFound("The record you are trying to delete does not exist");
            return NoContent();    
         }

    }
}