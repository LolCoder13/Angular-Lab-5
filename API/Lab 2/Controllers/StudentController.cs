using AutoMapper;
using Lab_2.DTOs;
using Lab_2.Models;
using Lab_2.UoW;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Lab_2.Controllers
{
    /// <summary>
    /// Provides endpoints for student authentication and student management operations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UnitOFWork unit;

        private readonly IMapper map;
        public UserManager<IdentityStudent> _Usermanager { get; }
        public SignInManager<IdentityStudent> _Signmanager { get; }

        public StudentController(UnitOFWork unit,IMapper map,UserManager<IdentityStudent> mng,SignInManager<IdentityStudent>sgn)
        {
            this.unit = unit;
            this.map = map;
            this._Usermanager = mng;
            this._Signmanager = sgn;
        }

        /// <summary>
        /// Registers a new student account.
        /// </summary>
        /// <param name="stdto">Registration data including full name, age, username, email, and password.</param>
        /// <returns>Created when registration succeeds; otherwise, returns validation or identity errors.</returns>
        [HttpPost("Register")]
        [EndpointSummary("Register a new student account")]
        [EndpointDescription("Creates a new identity student and assigns the student role.")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult register(addStudentDTO stdto)
        {
            if (stdto == null) return BadRequest();
            if (ModelState.IsValid)
            {
                IdentityStudent s = new IdentityStudent()
                {
                    StFname = stdto.stFname,
                    StLname = stdto.stLname,
                    age = stdto.age,
                    address = stdto.address,
                    DeptId = stdto.deptId,
                    UserName = stdto.username,
                    Email = stdto.email
                };
                var r = _Usermanager.CreateAsync(s, stdto.password).Result;
                if (r.Succeeded)
                {
                    var r2 = _Usermanager.AddToRoleAsync(s, "student").Result;
                    if (r2.Succeeded) return Created();
                    else return BadRequest(r2.Errors);
                }
                else return BadRequest(r.Errors);

            }
            else
                return BadRequest(ModelState);

        }

        /// <summary>
        /// Authenticates a student and returns a JWT token.
        /// </summary>
        /// <param name="d">Login credentials containing username and password.</param>
        /// <returns>A JWT token string when authentication succeeds; otherwise, unauthorized.</returns>
        [HttpPost("Login")]
        [EndpointSummary("Login and receive JWT token")]
        [EndpointDescription("Authenticates the student credentials and returns a signed JWT token.")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult login(LoginDataDTo d)
        {
            var loginresult = _Signmanager.PasswordSignInAsync(d.username, d.password, d.IsPresisted, false).Result;
            if (loginresult.Succeeded)
            {
                var user = _Usermanager.FindByNameAsync(d.username).Result;

                List<Claim> userdata = new List<Claim>();
                userdata.Add(new Claim("name", user.UserName));
                userdata.Add(new Claim(ClaimTypes.Email, user.Email));
                userdata.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

                var roles = _Usermanager.GetRolesAsync(user).Result;

                foreach (var itemrole in roles)
                {
                    userdata.Add(new Claim(ClaimTypes.Role, itemrole));
                }

                string key = "I'm Gonna Make him an offer he cannot Refuse";
                var seckey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
                var signingcer = new SigningCredentials(seckey, SecurityAlgorithms.HmacSha256);


                var token = new JwtSecurityToken(
                    claims: userdata,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signingcer
                    );
                var tokenstring = new JwtSecurityTokenHandler().WriteToken(token);


                return Ok(new { token = tokenstring });
            }

            return Unauthorized();
        }












        /// <summary>
        /// Gets all students with related supervisor and department information.
        /// </summary>
        /// <returns>A list of students.</returns>
        [HttpGet("GetAll")]
        //[Authorize]
        [EndpointSummary("Get all students")]
        [EndpointDescription("Returns all identity students.")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Get()
        {
            var students = _Usermanager.Users.Where(u=>u.DeptId!=null).Include(u=>u.Dept)
                .OrderBy(s => s.UserName)
                .Select(s => new UsersGetAllDTO
                {
                    Id = s.Id,
                    UserName = s.UserName,
                    Email = s.Email,
                    StFname = s.StFname,
                    StLname = s.StLname,
                    Age = s.age,
                    Address = s.address,
                    DeptName = s.Dept.DeptName
                })
                .ToList();

            return Ok(students);
        }

        /// <summary>
        /// Searches students by name or department with pagination.
        /// </summary>
        /// <param name="search">Optional search text applied to first name, last name, or department name.</param>
        /// <param name="pageNumber">Requested page number. Minimum value is 1.</param>
        /// <param name="pageSize">Requested page size. Minimum is 1 and maximum is 100.</param>
        /// <returns>A paged result containing total count and matching students.</returns>
        [HttpGet("Search")]
        [EndpointSummary("Search students with pagination")]
        [EndpointDescription("Filters identity students by username, first name, last name, or email and returns paged results.")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get([FromQuery] string? search, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            if (pageNumber < 1)
            {
                pageNumber = 1;
            }

            if (pageSize < 1)
            {
                pageSize = 10;
            }

            if (pageSize > 100)
            {
                pageSize = 100;
            }

            var query = _Usermanager.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(s =>
                    s.UserName.Contains(search) ||
                    s.StFname.Contains(search) ||
                    s.StLname.Contains(search) ||
                    s.Email.Contains(search));
            }

            var totalCount = query.Count();
            var std = query
                .OrderBy(s => s.UserName)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(s => new IdentityStudentDTO
                {
                    Id = s.Id,
                    UserName = s.UserName,
                    Email = s.Email,
                    StFname = s.StFname,
                    StLname = s.StLname,
                    Age = s.age,
                    Address = s.address,
                    DeptId = s.DeptId
                })
                .ToList();

            return Ok(new
            {
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = std
            });
        }
        /// <summary>
        /// Gets a single student by id.
        /// </summary>
        /// <param name="id">Identity student id.</param>
        /// <returns>The student if found; otherwise, not found.</returns>
        [HttpGet("{id}")]
        [EndpointSummary("Get student by id")]
        [EndpointDescription("Returns a single identity student by identifier.")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(string id)
        {
            var std = _Usermanager.FindByIdAsync(id).Result;
            if (std == null)
            {
                return NotFound();
            }

            return Ok(new IdentityStudentDTO
            {
                Id = std.Id,
                UserName = std.UserName,
                Email = std.Email,
                StFname = std.StFname,
                StLname = std.StLname,
                Age = std.age,
                Address = std.address,
                DeptId = std.DeptId
            });
        }

        /// <summary>
        /// Creates a new student record.
        /// </summary>
        /// <param name="student">Identity student data to create.</param>
        /// <returns>The created student resource.</returns>
        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [EndpointSummary("Create a student")]
        [EndpointDescription("Creates an identity student account.")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Post(addStudentDTO student)
        {
            if (student == null)
            {
                return BadRequest();
            }

            if (_Usermanager.FindByNameAsync(student.username).Result != null)
            {
                return Conflict("Student with the same username already exists.");
            }

            IdentityStudent newStudent = new IdentityStudent
            {
                StFname = student.stFname,
                StLname = student.stLname,
                age = student.age,
                address = student.address,
                DeptId = student.deptId,
                UserName = student.username,
                Email = student.email
            };

            var result = _Usermanager.CreateAsync(newStudent, student.password).Result;
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var roleResult = _Usermanager.AddToRoleAsync(newStudent, "student").Result;
            if (!roleResult.Succeeded)
            {
                return BadRequest(roleResult.Errors);
            }

            return CreatedAtAction(nameof(GetById), new { id = newStudent.Id }, new IdentityStudentDTO
            {
                Id = newStudent.Id,
                UserName = newStudent.UserName,
                Email = newStudent.Email,
                StFname = newStudent.StFname,
                StLname = newStudent.StLname,
                Age = newStudent.age,
                Address = newStudent.address,
                DeptId = newStudent.DeptId
            });
        }

        /// <summary>
        /// Updates an existing student record.
        /// </summary>
        /// <param name="id">Identity student id from route.</param>
        /// <param name="student">Updated identity student data.</param>
        /// <returns>The updated student when successful.</returns>
        [HttpPut("{id}")]
        [EndpointSummary("Update a student")]
        [EndpointDescription("Updates an existing identity student by id.")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Put(string id, UpdateIdentityStudentDTO student)
        {
            if (student == null)
            {
                return BadRequest();
            }

            var existing = _Usermanager.FindByIdAsync(id).Result;
            if (existing == null)
            {
                return NotFound();
            }

            existing.StFname = student.stFname;
            existing.StLname = student.stLname;
            existing.age = student.age;
            existing.address = student.address;
            existing.DeptId = student.deptId;
            existing.UserName = student.username;
            existing.Email = student.email;

            var result = _Usermanager.UpdateAsync(existing).Result;
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new IdentityStudentDTO
            {
                Id = existing.Id,
                UserName = existing.UserName,
                Email = existing.Email,
                StFname = existing.StFname,
                StLname = existing.StLname,
                Age = existing.age,
                Address = existing.address,
                DeptId = existing.DeptId
            });
        }

        /// <summary>
        /// Deletes a student by id.
        /// </summary>
        /// <param name="id">Identity student id.</param>
        /// <returns>No content when deleted; otherwise, not found.</returns>
        [HttpDelete("{id}")]
        [EndpointSummary("Delete a student")]
        [EndpointDescription("Deletes an identity student by identifier.")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(string id)
        {
            var student = _Usermanager.FindByIdAsync(id).Result;
            if (student == null)
            {
                return NotFound();
            }

            var result = _Usermanager.DeleteAsync(student).Result;
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }
    }
}
