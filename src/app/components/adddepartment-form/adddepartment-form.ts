import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Department } from '../../services/department';

@Component({
  selector: 'app-adddepartment-form',
  imports: [MatDialogModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './adddepartment-form.html',
  styleUrl: './adddepartment-form.css',
})
export class AdddepartmentForm {
  deptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deptService: Department,
    public dialogRef: MatDialogRef<AdddepartmentForm>
  ) {
    this.deptForm = this.fb.group({
      deptId: ['', Validators.required],
      deptName: ['', Validators.required],
      deptDesc: ['', Validators.required],
      deptLocation: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.deptForm.valid) {
      this.deptService.addDepartment(this.deptForm.value).subscribe(() => {
        this.dialogRef.close(true); 
      });
    }
    console.log(this.deptForm.value);
  }
}
