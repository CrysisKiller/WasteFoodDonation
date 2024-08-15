using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Address;
using api.Models;

namespace api.Dtos
{
    public class DonorDto
    {
        public int Id { get; set; }
        public string FoodDetails { get; set; } = string.Empty;
        public string FoodType { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime ExpDate { get; set; }
        public AddressDto address {get;set;}
    }
}