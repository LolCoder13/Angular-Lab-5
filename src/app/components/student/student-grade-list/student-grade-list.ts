import { Component, OnInit } from '@angular/core';
import { Course } from '../../../services/course';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-student-grade-list',
  imports: [MatTableModule],
  templateUrl: './student-grade-list.html',
  styleUrl: './student-grade-list.css',
})
export class StudentGradeList implements OnInit {
  studentCourses = new MatTableDataSource<{ crsId: number; crsName: string; grade: number }>([]);
  displayedColumns: string[] = ['crsName', 'grade'];
  studentId: string | null = null;
  constructor(private courseService: Course, private dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    if (!this.studentId) {
      console.error('Missing studentId route parameter');
      return;
    }

    this.courseService.getStudentGrades(this.studentId).subscribe({
      next: (data) => this.studentCourses.data = data,
      error: (err) => console.error('API Error:', err)
    });
  }
}