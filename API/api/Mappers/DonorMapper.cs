using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class DonorMapper
    {
        public static Donor ToDonorRequest(this CreateDonorDto donorDto){
            return new Donor{
                FoodDetails = donorDto.FoodDetails,
                Description=donorDto.Description,
                ExpDate = donorDto.ExpDate,
                CreatedOn = donorDto.CreatedOn,
                FoodType = donorDto.FoodType
            };
        }

        public static DonorDto ToDonorDto(this Donor donorDto){
            return new DonorDto{
                Id = donorDto.Id,
                Description = donorDto.Description,
                FoodDetails = donorDto.FoodDetails,
                ExpDate = donorDto.ExpDate,
                CreatedOn = donorDto.CreatedOn,
                FoodType = donorDto.FoodType,
                address = donorDto.address?.ToAddressDto()
            };
        }
    }
}