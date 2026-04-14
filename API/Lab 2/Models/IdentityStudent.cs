using Microsoft.AspNetCore.Identity;

namespace Lab_2.Models
{
    public class IdentityStudent : IdentityUser
    {
        public int age { get; set; }
        public string address { get; set; }
        public string StFname { get; set; }
        public string StLname { get; set; }
        public int? DeptId { get; set; }

        public virtual Department Dept { get; set; }
        public virtual ICollection<StudentCourses> StudentCourses { get; set; }
    }
}
