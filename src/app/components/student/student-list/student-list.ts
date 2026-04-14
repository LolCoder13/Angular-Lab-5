import { Component } from '@angular/core';
import { Student } from '../../../services/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentModel } from '../../../models/student/student.model';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { GradeStudent } from '../grade-student/grade-student';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-list',
  imports: [MatTableModule, MatButton, RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students = new MatTableDataSource<StudentModel>([]);
  displayedColumns: string[] = ['stFname', 'stLname','userName', 'email', 'age', 'address', 'deptName','actions'];
  constructor(private studentService: Student, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => this.students.data = data,
      error: (err) => console.error('API Error:', err)
    });
  }
  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.error('API Error:', err)
      });
    }
  }
  openGradeDialog(student: StudentModel, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(GradeStudent, {
      width: '400px',
      data: student,
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(() => this.ngOnInit());
  }
}
