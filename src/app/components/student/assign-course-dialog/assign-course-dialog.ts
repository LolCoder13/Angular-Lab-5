import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { CourseModel } from '../../../models/course/course.model';
import { Course } from '../../../services/course';
import { Student } from '../../../services/student';

@Component({
  selector: 'app-assign-course-dialog',
  imports: [MatDialogModule, 
    AsyncPipe,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,MatSelectModule],
  templateUrl: './assign-course-dialog.html',
  styleUrl: './assign-course-dialog.css',
})
export class AssignCourseDialog {
  studentForm: FormGroup;
  courses$!: Observable<{crsId: number; crsName: string}[]>;
  ngOnInit(): void {
    console.log(this.data);
    this.courses$ = this.courseService.getAssignableCourses(this.data.id);
    console.log(this.courses$);
    
  }

  constructor(
    private fb: FormBuilder,
    private courseService: Course,
    public dialogRef: MatDialogRef<AssignCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this.fb.group({
      crsId: [null, Validators.required]
    });
  }
  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.data);
      this.courseService.assignCourseToStudent(this.data.id, this.studentForm.value.crsId).subscribe(() => {
        this.dialogRef.close(true); 
      });
    }
    console.log(this.studentForm.value);
  }
}
