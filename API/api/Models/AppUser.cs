using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    [Table("Portfolios")]

    public class AppUser: IdentityUser
    {
         public List<Portfolio> portfolios { get; set; } = new List<Portfolio>();      
    }
}