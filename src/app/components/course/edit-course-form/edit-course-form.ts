import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../services/course';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentModel } from '../../../models/department.model';
import { Department } from '../../../services/department';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course-form',
  imports: [MatDialogModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,CommonModule,MatSelectModule],
  templateUrl: './edit-course-form.html',
  styleUrl: './edit-course-form.css',
})
export class EditCourseForm implements OnInit {
  courseForm: FormGroup;
  depts: DepartmentModel[] = [];
  ngOnInit(): void {
    this.deptService.getDepartments().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.depts.length = 0;
          this.depts.push(...data);
           this.courseForm.patchValue({ deptId: this.data.deptId }, { emitEvent: false });
       });
      },
      error: (err) => console.error('API Error:', err)
    });
  }
  constructor(
    private fb: FormBuilder,
    private courseService: Course,
    private deptService: Department,
    public dialogRef: MatDialogRef<EditCourseForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseForm = this.fb.group({
      crsName: [this.data.crsName, Validators.required],
      crsDuration: [this.data.crsDuration, Validators.required],
      deptId: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.updateCourse(this.data.crsId, { crsId: this.data.crsId, ...this.courseForm.value }).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
