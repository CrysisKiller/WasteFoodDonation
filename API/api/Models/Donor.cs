using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace api.Models
{
    [Table("Donor")]
    public class Donor
    {
        public int Id { get; set; }
        public string FoodDetails { get; set; } = string.Empty;
        public string FoodType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime ExpDate { get; set; }
        public Address address { get; set; } //navigation prop
        public List<Portfolio> portfolios { get; set; } = new List<Portfolio>();   

    }
}