using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab_2.DTOs
{
    public class CourseDTO
    {
        public int CrsId { get; set; }

        public string CrsName { get; set; }

        public int? CrsDuration { get; set; }

        public int DeptId { get; set; }
        public string DeptName { get; set; }
        
        public int? ActiveStudents {  get; set; }
    }
}
