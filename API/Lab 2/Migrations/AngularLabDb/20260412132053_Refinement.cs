using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lab_2.Migrations.AngularLabDb
{
    /// <inheritdoc />
    public partial class Refinement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Course_CourseId",
                table: "StudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Student_StudentId",
                table: "StudentCourses");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropIndex(
                name: "IX_StudentCourses_StudentId",
                table: "StudentCourses");

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "StudentCourses",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "DeptId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StFname",
                table: "AspNetUsers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StLname",
                table: "AspNetUsers",
                type: "nchar(10)",
                fixedLength: true,
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "AspNetUsers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentCourses_StudentId_CourseId",
                table: "StudentCourses",
                columns: new[] { "StudentId", "CourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_DeptId",
                table: "AspNetUsers",
                column: "DeptId");

            migrationBuilder.AddForeignKey(
                name: "FK_IdentityStudent_Department",
                table: "AspNetUsers",
                column: "DeptId",
                principalTable: "Department",
                principalColumn: "Dept_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Course",
                table: "StudentCourses",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Crs_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Student",
                table: "StudentCourses",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IdentityStudent_Department",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Course",
                table: "StudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Student",
                table: "StudentCourses");

            migrationBuilder.DropIndex(
                name: "IX_StudentCourses_StudentId_CourseId",
                table: "StudentCourses");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_DeptId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DeptId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StFname",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StLname",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "address",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "age",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "StudentCourses",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    St_Id = table.Column<int>(type: "int", nullable: false),
                    Dept_Id = table.Column<int>(type: "int", nullable: true),
                    St_Address = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    St_Age = table.Column<int>(type: "int", nullable: true),
                    St_Fname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    St_Lname = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    St_super = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.St_Id);
                    table.ForeignKey(
                        name: "FK_Student_Department",
                        column: x => x.Dept_Id,
                        principalTable: "Department",
                        principalColumn: "Dept_Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentCourses_StudentId",
                table: "StudentCourses",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Student_Dept_Id",
                table: "Student",
                column: "Dept_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Course_CourseId",
                table: "StudentCourses",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Crs_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Student_StudentId",
                table: "StudentCourses",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "St_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
