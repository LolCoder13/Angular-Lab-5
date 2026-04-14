using System.ComponentModel.DataAnnotations;

namespace Lab_2.Models
{
    public class StudentCourses
    {
        [Key]
        public int Id { get; set; }
        public int? Grade { get; set; }
        public string StudentId { get; set; }
        public virtual IdentityStudent Student { get; set; }
        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}
