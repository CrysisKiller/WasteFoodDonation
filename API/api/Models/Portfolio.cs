using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Portfolio
    {
        public string AppUserId { get; set; } = string.Empty;
        public int  DonorId { get; set; }
        public AppUser appUser { get; set; }
        public Donor donor { get; set; }
    }
}