using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Address")]
    public class Address
    {
        public int Id { get; set; }
        public string AddressLine { get; set; } = string.Empty;
        public string State { get; set; }= string.Empty;
        public string City { get; set; }= string.Empty;
        public int Pincode { get; set; } 
        public int? DonorId { get; set; }
        public Donor donor { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        

    }
}