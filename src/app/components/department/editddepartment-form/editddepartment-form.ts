import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Department } from '../../../services/department';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editddepartment-form',
  imports: [MatDialogModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,CommonModule],
  templateUrl: './editddepartment-form.html',
  styleUrl: './editddepartment-form.css',
})
export class EditddepartmentForm {
  deptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deptService: Department,
    public dialogRef: MatDialogRef<EditddepartmentForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deptForm = this.fb.group({
      deptName: [this.data.deptName, Validators.required],
      deptDesc: [this.data.deptDesc, Validators.required],
      deptLocation: [this.data.deptLocation, Validators.required],
    });
  }
  onSubmit() {
    if (this.deptForm.valid) {
      this.deptService.updateDepartment(this.data.deptId, {deptId: this.data.deptId, ...this.deptForm.value }).subscribe(() => {
        this.dialogRef.close(true); 
      });
    }
    console.log(this.deptForm.value);
  }
}
