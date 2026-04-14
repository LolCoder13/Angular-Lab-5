using AutoMapper;
using Lab_2.DTOs;
using Lab_2.Models;
using Lab_2.UoW;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly UnitOFWork context;
        private readonly IMapper map;

        public DepartmentController(UnitOFWork context,IMapper map)
        {
            this.context = context;
            this.map = map;
        }
        [EndpointSummary("select all Departments")]
        [EndpointDescription("read all departments from database  ex:/api/departments")]
        [ProducesResponseType(200, Type = typeof(DepartmentDTO))]
        [ProducesResponseType(404, Type = typeof(void))]
        //[ProducesErrorResponseType(typeof(void))]
        [HttpGet]
        public IActionResult Get() {

            var depts = context.DeptReps.IncludeStudentsWithDepartments();
            return Ok(map.Map<List<DepartmentDTO>>(depts));
        }
        [HttpGet("{id}")]
        [EndpointSummary("select a specific department")]
        [EndpointDescription("select a specific department from database  ex:/api/departments?id={}")]
        public IActionResult GetByID(int id) {
            var dept = context.DeptReps.GetDepartmentWithStudents(id);
            if (dept == null)
            {
                return NotFound();
            }

            var res = map.Map<DepartmentDTO>(dept);
            return Ok(res);

        }

        [HttpPost]
        [EndpointSummary("Adds a new department")]
        [EndpointDescription("add a new department   ex:/api/departments method:post and the department in the body")]
        public IActionResult Post(CreateDepartmentDTO departmentDto)
        {
            if (!context.DeptReps.CanUseId(departmentDto.DeptId))
            {
                return Conflict("Department with the same id already exists.");
            }

            var department = new Department
            {
                DeptId = departmentDto.DeptId,
                DeptName = departmentDto.DeptName,
                DeptDesc = departmentDto.DeptDesc,
                DeptLocation = departmentDto.DeptLocation
            };

            context.DeptReps.Add(department);
            context.save();

            var created = context.DeptReps.GetDepartmentWithStudents(department.DeptId);

            return CreatedAtAction(nameof(GetByID), new { id = department.DeptId }, map.Map<DepartmentDTO>(created));
        }

        [HttpPut("{id}")]
        [EndpointSummary("Edit An existing department")]
        [EndpointDescription("edit and exisitng department NOTE: Evne if you dont change a property still send it in the request or it will be null" +
            "   ex:/api/departments?id={} method:put and the department in the body")]
        public IActionResult Put(int id, CreateDepartmentDTO departmentDto)
        {
            if (id != departmentDto.DeptId)
            {
                Console.WriteLine(id);
                Console.WriteLine(departmentDto.DeptId);
                return BadRequest();
            }

            var existing = context.DeptReps.FindById(id);
            if (existing == null)
            {
                return NotFound();
            }

            var department = new Department
            {
                DeptId = departmentDto.DeptId,
                DeptName = departmentDto.DeptName,
                DeptDesc = departmentDto.DeptDesc,
                DeptLocation = departmentDto.DeptLocation
            };

            context.DeptReps.Edit(department);
            context.save();

            var updated = context.DeptReps.GetDepartmentWithStudents(id);
                

            return Ok(map.Map<DepartmentDTO>(updated));
        }

        [HttpDelete("{id}")]
        [EndpointSummary("deletes a department from the database")]
        [EndpointDescription("deletes a department from the database NOTE:It is a hard delete so worry about the FK Constraints   ex:/api/departments?id={} method:delete")]
        public IActionResult Delete(int id)
        {
            var res = context.DeptReps.delete(id);
            if (res == true) {
                context.save();
                return NoContent();
            }
            return NotFound();
            //var dept = context.Departments.FirstOrDefault(d => d.DeptId == id);
            //if (dept == null)
            //{
            //    return NotFound();
            //}

            //context.Departments.Remove(dept);
            //context.SaveChanges();
            //return NoContent();
        }
        }


    }
