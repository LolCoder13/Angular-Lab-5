using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab_2.DTOs
{
    public class DepartmentDTO
    {
        public int DeptId { get; set; }

        public string DeptName { get; set; }

        public string DeptDesc { get; set; }
        public string DeptLocation { get; set; }
        public int StdCount { get; set; }
    }
}
