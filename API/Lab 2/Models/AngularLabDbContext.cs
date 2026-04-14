using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Models
{
    public class AngularLabDbContext : IdentityDbContext<IdentityStudent>
    {
        public AngularLabDbContext(DbContextOptions<AngularLabDbContext> options):base(options)
        {
        }

        public virtual DbSet<Course> Courses { get; set; }

        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<StudentCourses> StudentCourses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityRole>().HasData(

                new IdentityRole() { Id = "1", Name = "student", NormalizedName = "STUDENT", ConcurrencyStamp = "1" },
                new IdentityRole() { Id = "2", Name = "teacher", NormalizedName = "TEACHER", ConcurrencyStamp = "2" },
                new IdentityRole() { Id = "3", Name = "parent", NormalizedName = "PARENT", ConcurrencyStamp = "3" }
                );
            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.CrsId).ValueGeneratedNever();
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DeptId).ValueGeneratedNever();
            });

            modelBuilder.Entity<IdentityStudent>(entity =>
            {
                entity.Property(e => e.StFname).HasMaxLength(50);
                entity.Property(e => e.StLname).HasMaxLength(10).IsFixedLength();
                entity.Property(e => e.address).HasMaxLength(100);

                entity.HasOne(d => d.Dept)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.DeptId)
                    .HasConstraintName("FK_IdentityStudent_Department");
            });

            modelBuilder.Entity<StudentCourses>(entity =>
            {
                entity.HasIndex(e => new { e.StudentId, e.CourseId }).IsUnique();

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.StudentCourses)
                    .HasForeignKey(d => d.StudentId)
                    .HasConstraintName("FK_StudentCourses_Student");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.StudentCourses)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_StudentCourses_Course");
            });
           
        }

    }
}
