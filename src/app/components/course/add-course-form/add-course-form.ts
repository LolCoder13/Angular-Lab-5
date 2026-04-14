import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Course } from '../../../services/course';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Department } from '../../../services/department';
import { DepartmentModel } from '../../../models/department.model';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-course-form',
  imports: [MatDialogModule, 
    AsyncPipe,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,MatSelectModule],
  templateUrl: './add-course-form.html',
  styleUrl: './add-course-form.css',
})
export class AddCourseForm implements OnInit {
  courseForm: FormGroup;
  depts$!: Observable<DepartmentModel[]>;

  ngOnInit(): void {
    this.depts$ = this.deptService.getDepartments();
  }

  constructor(
    private fb: FormBuilder,
    private courseService: Course,
    private deptService: Department,
    public dialogRef: MatDialogRef<AddCourseForm>
  ) {
    this.courseForm = this.fb.group({
      crsId: ['', Validators.required],
      crsName: ['', Validators.required],
      crsDuration: ['', Validators.required],
      deptId: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value).subscribe(() => {
        this.dialogRef.close(true); 
      });
    }
    console.log(this.courseForm.value);
  }
}
