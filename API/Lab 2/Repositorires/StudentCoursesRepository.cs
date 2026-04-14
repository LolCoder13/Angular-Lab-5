using Lab_2.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Repositorires
{
    public class StudentCoursesRepository : GenericRepository<StudentCourses>
    {
        public StudentCoursesRepository(AngularLabDbContext context) : base(context)
        {
        }

        public IQueryable<StudentCourses> StudentCoursesWithDetails()
        {
            return context.StudentCourses
                .Include(sc => sc.Student)
                .Include(sc => sc.Course)
                .AsQueryable();
        }

        public StudentCourses GetByStudentAndCourse(string studentId, int courseId)
        {
            return context.StudentCourses
                .FirstOrDefault(sc => sc.StudentId == studentId && sc.CourseId == courseId);
        }
    }
}
