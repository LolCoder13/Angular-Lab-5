using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Models
{
    public class MyDbContext : IdentityDbContext
    {
        //public ITIContext()
        //{

        //}
        public MyDbContext(DbContextOptions<MyDbContext> option) : base(option)
        {

        }

        public virtual DbSet<IdentityStudent> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(

                new IdentityRole() { Id = "1", Name = "student", NormalizedName = "STUDENT", ConcurrencyStamp = "1" },
                new IdentityRole() { Id = "2", Name = "teacher", NormalizedName = "TEACHER", ConcurrencyStamp = "2" },
                new IdentityRole() { Id = "3", Name = "parent", NormalizedName = "PARENT", ConcurrencyStamp = "3" }
                );


        }
    }
}
