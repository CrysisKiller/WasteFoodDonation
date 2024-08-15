using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Address;
using api.Models;

namespace api.Mappers
{
    public static class AddressMapper
    {
        public static Address ToCreateAddressDto(this CreateAdddressNewDto createAddressDto,int donorId){
            return new Address{
                AddressLine= createAddressDto.AddressLine,
                City = createAddressDto.City,
                Pincode = createAddressDto.Pincode,
                State = createAddressDto.State,
                DonorId = donorId
            };
        }

        public static AddressDto ToAddressDto(this Address address){
            
            return new AddressDto{
                AddressLine=address.AddressLine,
                City = address.City,
                Id = address.Id,
                DonorId = address.DonorId,
                State = address.State,
                Pincode = address.Pincode,
                CreatedBy = address.AppUser.UserName
            };
        }
    }
}