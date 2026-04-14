import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';
import { DepartmentModel } from '../../../models/department.model';
import { CourseModel } from '../../../models/course/course.model';
import { Student } from '../../../services/student';
import { Course } from '../../../services/course';

@Component({
  selector: 'app-grade-student',
  imports: [MatDialogModule, 
    AsyncPipe,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,MatSelectModule],
  templateUrl: './grade-student.html',
  styleUrl: './grade-student.css',
})
export class GradeStudent {
  studentForm: FormGroup;
  courses$!: Observable<CourseModel[]>;
  ngOnInit(): void {
    this.courses$ = this.courseService.loadCourses();
  }

  constructor(
    private fb: FormBuilder,
    private courseService: Course,
    private studentService: Student,
    public dialogRef: MatDialogRef<GradeStudent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this.fb.group({
      crsId: [null, Validators.required],
      grade: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }
  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.data);
      this.studentService.gradeStudent(this.data.id, this.studentForm.value.crsId, this.studentForm.value.grade).subscribe(() => {
        this.dialogRef.close(true); 
        
      });
    }
    console.log(this.studentForm.value);
  }
}
