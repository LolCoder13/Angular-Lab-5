import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../../models/department.model';
import { Department } from '../../services/department';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdddepartmentForm } from '../adddepartment-form/adddepartment-form';
import { MatButton } from '@angular/material/button';
import { EditddepartmentForm } from '../department/editddepartment-form/editddepartment-form';

@Component({
  selector: 'app-department-list',
  imports: [MatTableModule, MatButton],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList implements OnInit {
  departments = new MatTableDataSource<DepartmentModel>([]);
  displayedColumns: string[] = ['deptId', 'deptName', 'deptDesc', 'deptLocation', 'stdCount', 'actions'];
  constructor(private deptService: Department, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDepartments();
  }
  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AdddepartmentForm, {
      width: '400px', enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => this.loadDepartments());
  }
  openEditDialog(department: DepartmentModel) {
    this.dialog.open(EditddepartmentForm, { width: '400px', data: department }).afterClosed().subscribe(() => this.loadDepartments());
  }
  loadDepartments() {
    this.deptService.getDepartments().subscribe({
      next: (data) => this.departments.data = data,
      error: (err) => console.error('API Error:', err)
    });
  }
  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.deptService.deleteDepartment(id).subscribe({
        next: () => {
          console.log('Department deleted successfully');
          this.loadDepartments();
        },
        error: (err) => console.error('API Error:', err)
      });
    }
  }
}
