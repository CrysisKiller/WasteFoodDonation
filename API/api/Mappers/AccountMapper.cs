using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;

namespace api.Mappers
{
    public static class AccountMapper
    {
        public static AppUserDto ToAppUserDto(this AppUser appUser){
            return new AppUserDto{
                Id=appUser.Id,
                PhoneNumber = appUser.PhoneNumber,
                Email=appUser.Email,
                UserName=appUser.UserName,
            };
        }
    }
}