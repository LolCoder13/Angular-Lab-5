import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CourseModel } from '../../../models/course/course.model';
import { Course } from '../../../services/course';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseForm } from '../add-course-form/add-course-form';
import { MatButton } from '@angular/material/button';
import { EditCourseForm } from '../edit-course-form/edit-course-form';

@Component({
  selector: 'app-course-list',
  imports: [MatTableModule, MatButton],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses = new MatTableDataSource<CourseModel>([]);
  displayedColumns: string[] = ['crsId', 'crsName', 'crsDuration', 'deptName', 'activeStudents', 'actions'];
  constructor(private courseService: Course, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.courseService.loadCourses().subscribe({
      next: (data) => this.courses.data = data,
      error: (err) => console.error('API Error:', err)
    });
  }
  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddCourseForm, {
      width: '400px', enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => this.ngOnInit());
  }
  openEditDialog(course: CourseModel, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(EditCourseForm, {
      width: '400px', enterAnimationDuration,
      exitAnimationDuration, data: course
    }).afterClosed().subscribe(() => this.ngOnInit());
  }
  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.error('API Error:', err)
      });
    }
  }
}
