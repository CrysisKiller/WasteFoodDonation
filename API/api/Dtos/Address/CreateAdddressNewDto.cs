using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Address
{
    public class CreateAdddressNewDto
    {
        public string AddressLine { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Pincode { get; set; }
    }
}