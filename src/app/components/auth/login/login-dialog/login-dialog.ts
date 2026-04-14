import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Login } from '../../../../services/auth/login';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-login-dialog',
  imports: [MatDialogModule,ReactiveFormsModule,MatInputModule
    ,MatInputModule,MatButtonModule,MatSelectModule,MatCheckboxModule
  ],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
})
export class LoginDialog {
  loginForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<LoginDialog>,private fb:FormBuilder,private loginService:Login,private snakeBar:MatSnackBar) {
    
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      isPresisted: [false]
    });
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          this.loginService.saveToken(response.token);
          this.snakeBar.open('Login successful', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error:(err)=>{
          console.error('Login failed', err);
          this.snakeBar.open('Login failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
