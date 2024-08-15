using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class CreateDonorDto
    {
        public string FoodDetails { get; set; } = string.Empty;
        public string FoodType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime ExpDate { get; set; }
    }
}