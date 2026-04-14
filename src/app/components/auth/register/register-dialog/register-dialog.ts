import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../../../../services/auth/login';
import { AsyncPipe } from '@angular/common';
import { DepartmentModel } from '../../../../models/department.model';
import { Observable } from 'rxjs/internal/Observable';
import { Department } from '../../../../services/department';
@Component({
  selector: 'app-register-dialog',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatInputModule, MatInputModule, MatButtonModule, MatSelectModule, AsyncPipe],
  templateUrl: './register-dialog.html',
  styleUrl: './register-dialog.css',
})
export class RegisterDialog implements OnInit {
  registerForm: FormGroup;
  depts$!: Observable<DepartmentModel[]>;

  ngOnInit(): void {
    this.depts$ = this.deptService.getDepartments();
  }
  constructor(
    public dialogRef: MatDialogRef<RegisterDialog>,
    private fb: FormBuilder,
    private loginService: Login,
    private deptService: Department,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      stFname: ['', Validators.required],
      stLname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      age: [0, Validators.required],
      address: ['', Validators.required],
      deptId: [null]
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.snackBar.open('Registration successful Please Login', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Please complete all required fields.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  }
}
