using Lab_2.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Repositorires
{
    public class CourseRepository : GenericRepository<Course>
    {
        public CourseRepository(AngularLabDbContext context) : base(context)
        {
        }

        public IQueryable<Course> CoursesWithDepartment()
        {
            return context.Courses.Include(c => c.Dept).AsQueryable();
        }
        public IQueryable<Course> CoursesWithDepartmentAndStudents()
        {
            return context.Courses.Include(c => c.Dept).Include(c=>c.StudentCourses).AsQueryable();
        }
        public Course GetCourseWithDepartment(int id)
        {
            return context.Courses.Include(c => c.Dept).FirstOrDefault(c => c.CrsId == id);
        }
    }
}
