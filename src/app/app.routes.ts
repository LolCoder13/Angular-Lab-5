import { Routes } from '@angular/router';
import { CourseList } from './components/course/course-list/course-list';
import { DepartmentList } from './components/department-list/department-list';
import { Admin } from './components/views/admin/admin';
import { NotFound } from './components/shared/not-found/not-found';
import { HomePage } from './components/shared/home-page/home-page';
import { adminGuard, adminChildGuard } from './guards/admin.guard';
import { RegisterDialog } from './components/auth/register/register-dialog/register-dialog';
import { StudentList } from './components/student/student-list/student-list';
import { StudentGradeList } from './components/student/student-grade-list/student-grade-list';

export const routes: Routes = [
	{
		path: '',
		component:HomePage,
		pathMatch: 'full'
	},
    {
		path: 'Unauthorized',
		component: NotFound
	},
	{
		path: 'admin',
		component: Admin,
		canActivate: [adminGuard],
		canActivateChild: [adminChildGuard],
		children: [
			{
				path: '',
				redirectTo: 'courses',
				pathMatch: 'full'
			},
			{
				path: 'departments',
				component: DepartmentList
			},
			{
				path: 'courses',
				component: CourseList
			},
            {
				path: 'students',
				component: StudentList
			},
            {
                path: 'view-grades/:studentId',
                component: StudentGradeList
            }
		]
	},
	{
		path: '**',
		component: NotFound
	}
];
