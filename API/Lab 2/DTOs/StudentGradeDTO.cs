using Microsoft.EntityFrameworkCore.Metadata;

namespace Lab_2.DTOs
{
    public class StudentGradeDTO
    {
        public int CrsId { get; set; }
        public string CrsName { get; set; }
        public int Grade {  get; set; }
    }
}
