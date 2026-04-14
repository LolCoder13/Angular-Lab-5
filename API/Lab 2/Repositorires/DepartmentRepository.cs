using Lab_2.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Repositorires
{
    public class DepartmentRepository : GenericRepository<Department>
    {
        public DepartmentRepository(AngularLabDbContext context):base(context)
        {
            
        }
        public List<Department> IncludeStudentsWithDepartments()
        {
            return context.Departments.Include(d=>d.Students).AsNoTracking().ToList();
        }
        public Department GetDepartmentWithStudents(int deptId)
        {
            return context.Departments
                .FirstOrDefault(d => d.DeptId == deptId);
        }
    }
}
