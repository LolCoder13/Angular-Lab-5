using Lab_2.Models;
using Lab_2.Repositorires;

namespace Lab_2.UoW
{
    public class UnitOFWork
    {
        AngularLabDbContext db;
        DepartmentRepository deptReps;
        CourseRepository courseReps;
        StudentCoursesRepository studentCourseReps;

        public UnitOFWork(AngularLabDbContext db)
        {
            this.db = db;

            // DeptReps = new GenericReps<Department>(db);
            //StudReps = new GenericReps<Student>(db);
        }
        public DepartmentRepository DeptReps
        {
            get
            {
                if (deptReps == null)
                    deptReps = new DepartmentRepository(db);
                return deptReps;
            }
        }

        public CourseRepository CourseReps
        {
            get
            {
                if (courseReps == null)
                    courseReps = new CourseRepository(db);
                return courseReps;
            }
        }

        public StudentCoursesRepository StudentCourseReps
        {
            get
            {
                if (studentCourseReps == null)
                    studentCourseReps = new StudentCoursesRepository(db);
                return studentCourseReps;
            }
        }

        public void save()
        {
            db.SaveChanges();
        }
    }
}
