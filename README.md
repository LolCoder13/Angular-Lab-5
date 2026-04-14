# Lab 5 - Angular + ASP.NET Core Student Management System

This repository contains a full-stack application:

- Frontend: Angular 21 (standalone components, Angular Material, PrimeNG)
- Backend: ASP.NET Core Web API (.NET 10, EF Core, Identity, JWT)
- Database: SQL Server via Entity Framework Core migrations

The app focuses on department, course, and student administration with role-based authorization for admin operations.

## Implemented Features

### Authentication and Authorization

- Register a new student account from the frontend dialog.
- Login with username and password.
- JWT token is saved in browser local storage.
- Admin-only route guard protects all admin pages.
- Unauthorized users are redirected to an Unauthorized page.

### Department Management (Admin)

- List all departments.
- Create department.
- Edit department.
- Delete department.
- Includes student count per department in the list.

### Course Management (Admin)

- List all courses with department and active students info.
- Create course.
- Edit course.
- Delete course.

### Student Management (Admin)

- List all students with department details.
- Delete student.
- Assign an available course to a student.
- Assign or update student grade per course.
- View all grades for a specific student.

### API and Developer Features

- Swagger UI enabled in Development.
- OpenAPI endpoint enabled in Development.
- CORS policy currently allows all origins/headers/methods.
- XML formatters added for controllers.

## Tech Stack

### Frontend

- Angular 21
- Angular Material
- PrimeNG
- Bootstrap 5

### Backend

- ASP.NET Core 10 Web API
- Entity Framework Core 10 (SQL Server)
- ASP.NET Core Identity
- JWT Bearer authentication
- AutoMapper

## Project Structure

- Frontend root: Lab_5
- Backend API: Lab_5/API/Lab 2

## Prerequisites

- Node.js 20+
- npm 11+
- .NET SDK 10.0
- SQL Server (or SQL Server Express/LocalDB)

## Backend Setup (API)

Run these steps from the backend folder:

1. Open terminal in: Lab_5/API/Lab 2
2. Configure connection string with key AngularLab5.

You can add it to appsettings.Development.json, for example:

{
	"ConnectionStrings": {
		"AngularLab5": "Server=.;Database=AngularLab5Db;Trusted_Connection=True;TrustServerCertificate=True"
	}
}

3. Apply migrations:

dotnet ef database update --context AngularLabDbContext

4. Run API:

dotnet run

5. API default URL:

http://localhost:5245

6. Swagger URL:

http://localhost:5245/swagger

## Frontend Setup (Angular)

Run these steps from the frontend root folder Lab_5:

1. Install dependencies:

npm install

2. Run frontend:

npm start

3. Open app:

http://localhost:4200

Note: Frontend services currently call the API directly at http://localhost:5245.

## Important Role Setup (Admin Access)

All management pages under /admin require role admin.

Current backend migrations seed roles student, teacher, and parent. They do not seed an admin role or admin user by default.

To use the admin dashboard, make sure:

1. Role admin exists in AspNetRoles.
2. Your user is linked to role admin in AspNetUserRoles.

You can do this through your preferred DB administration flow or by extending seed data in the backend.

## How to Use the Application

1. Start backend API first.
2. Start Angular frontend.
3. Open the app at http://localhost:4200.
4. If you do not have an account, use Sign Up.
5. Login with your credentials.
6. If your account has role admin, you can access:
	 - Departments
	 - Courses
	 - Students
7. Use Students page actions to:
	 - Assign course to student
	 - Grade student for assigned courses
	 - View student grades history

## Main API Endpoints (Summary)

### Student

- POST /api/Student/Register
- POST /api/Student/Login
- GET /api/Student/GetAll (admin)
- GET /api/Student/{id}
- POST /api/Student (admin)
- PUT /api/Student/{id}
- DELETE /api/Student/{id} (admin)

### Department

- GET /api/Department
- GET /api/Department/{id}
- POST /api/Department (admin)
- PUT /api/Department/{id} (admin)
- DELETE /api/Department/{id} (admin)

### Course

- GET /api/Course (admin)
- GET /api/Course/{id} (admin)
- POST /api/Course (admin)
- PUT /api/Course/{id} (admin)
- DELETE /api/Course/{id} (admin)
- POST /api/Course/{courseId}/students/{studentId}/grade (admin)
- GET /api/Course/Grades/{id} (admin)
- GET /api/Course/StudentCourses/{id} (admin)
- POST /api/Course/Assign?crsId={courseId}&stdId={studentId} (admin)
- GET /api/Course/AssignableCourses?id={studentId} (admin)

## Scripts

### Frontend

- npm start: Run Angular dev server.
- npm run build: Build frontend.
- npm test: Run frontend unit tests.

### Backend

- dotnet run: Run API.
- dotnet ef database update --context AngularLabDbContext: Apply migrations.

## Notes

- JWT signing key is currently hardcoded in Program.cs. Move it to secure configuration for production.
- CORS is fully open for development convenience and should be restricted in production.
