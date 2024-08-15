using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Address
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string AddressLine { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Pincode { get; set; }
        public int? DonorId { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
    }
}