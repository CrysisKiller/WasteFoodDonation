using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Donor> Donor {get;set;}
        public  DbSet<Address> Address { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Donor>()
            .HasOne(d=>d.address)
            .WithOne(d=>d.donor)
            .HasForeignKey<Address>(a=>a.DonorId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.DonorId }));
          
            builder.Entity<Portfolio>()
            .HasOne(u => u.appUser)
            .WithMany(u => u.portfolios)
            .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
            .HasOne(u => u.donor)
            .WithMany(u => u.portfolios)
            .HasForeignKey(p => p.DonorId);

            List<IdentityRole> Roles = new List<IdentityRole>
            {
                new IdentityRole{
                    Name="Admin",
                    NormalizedName ="ADMIN"
                },
                new IdentityRole{
                    Name="User",
                    NormalizedName ="USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(Roles);
        }

    }
}