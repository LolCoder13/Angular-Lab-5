using AutoMapper;
using Lab_2.DTOs;
using Lab_2.Models;
using Lab_2.UoW;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Lab_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly UnitOFWork unit;
        private readonly UserManager<IdentityStudent> userManager;
        private readonly IMapper map;

        public CourseController(UnitOFWork unit, UserManager<IdentityStudent> userManager,IMapper map)
        {
            this.unit = unit;
            this.userManager = userManager;
            this.map = map;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(map.Map<List<CourseDTO>>(unit.CourseReps.CoursesWithDepartmentAndStudents().ToList()));
            return Ok(unit.CourseReps.CoursesWithDepartment().ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var course = unit.CourseReps.GetCourseWithDepartment(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [HttpPost]
        public IActionResult Post(Course course)
        {
            if (!unit.CourseReps.CanUseId(course.CrsId))
            {
                return Conflict("Course with the same id already exists.");
            }

            unit.CourseReps.Add(course);
            unit.save();

            var created = unit.CourseReps.GetCourseWithDepartment(course.CrsId);
            return CreatedAtAction(nameof(GetById), new { id = course.CrsId }, created);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Course course)
        {
            if (id != course.CrsId)
            {
                return BadRequest();
            }

            var existing = unit.CourseReps.FindById(id);
            if (existing == null)
            {
                return NotFound();
            }

            unit.CourseReps.Edit(course);
            unit.save();

            var updated = unit.CourseReps.GetCourseWithDepartment(id);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = unit.CourseReps.delete(id);
            if (!deleted)
            {
                return NotFound();
            }

            unit.save();
            return NoContent();
        }

        [HttpPost("{courseId}/students/{studentId}/grade")]
        public IActionResult AssignGrade(int courseId, string studentId, [FromBody] AssignGradeDTO request)
        {
            var course = unit.CourseReps.FindById(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            var student = userManager.FindByIdAsync(studentId).Result;
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var enrollment = unit.StudentCourseReps.GetByStudentAndCourse(studentId, courseId);
            if (enrollment == null)
            {
                enrollment = new StudentCourses
                {
                    StudentId = studentId,
                    CourseId = courseId,
                    Grade = request.Grade
                };

                unit.StudentCourseReps.Add(enrollment);
            }
            else
            {
                enrollment.Grade = request.Grade;
                unit.StudentCourseReps.Edit(enrollment);
            }

            unit.save();

            var result = unit.StudentCourseReps.StudentCoursesWithDetails()
                .First(sc => sc.StudentId == studentId && sc.CourseId == courseId);

            return Ok(new
            {
                result.Id,
                result.StudentId,
                StudentName = $"{result.Student?.StFname} {result.Student?.StLname}".Trim(),
                result.CourseId,
                CourseName = result.Course?.CrsName,
                result.Grade
            });
        }
        [HttpGet("Grades/{id}")]
        public IActionResult GetAllStudentGrades(string id)
        {
            return Ok(unit.StudentCourseReps.StudentCoursesWithDetails().Where(s=>s.StudentId==id).Select(sc => new { CrsId = sc.CourseId, sc.Course.CrsName, sc.Grade }).ToList());
        }
    }

}
