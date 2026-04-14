using AutoMapper;
using Lab_2.DTOs;
using Lab_2.Models;

namespace Lab_2.Config
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Department, DepartmentDTO>().AfterMap(
                (src, dest) =>
                {
                    dest.StdCount = src.Students.Count;
                }
                );
            CreateMap<Course, CourseDTO>().AfterMap((src, dest) =>
            {
                dest.DeptName = src.Dept.DeptName;
                dest.ActiveStudents = src.StudentCourses.Count;
            });
        }
    }
}
