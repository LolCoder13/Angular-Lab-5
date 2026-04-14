import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../models/department.model';
import { CreatedepartmentModel } from '../models/createdepartment.model';

@Injectable({
  providedIn: 'root',
})
export class Department {
  private url = 'http://localhost:5245/api/Department';
  constructor(private http:HttpClient) {}

  getDepartments():Observable<DepartmentModel[]> {
    console.log('Fetching departments from API...');
    return this.http.get<DepartmentModel[]>(this.url);
  }

  addDepartment(dept: DepartmentModel): Observable<CreatedepartmentModel> {
    console.log('Adding department:', dept);
    return this.http.post<CreatedepartmentModel>(this.url, dept);
  }
  getDepartmentById(id: number): Observable<DepartmentModel> {
    console.log('Fetching department with ID:', id);
    return this.http.get<DepartmentModel>(`${this.url}/${id}`);
  }
  updateDepartment(id: number, dept: DepartmentModel): Observable<DepartmentModel> {
    console.log('Updating department:', dept);
    return this.http.put<DepartmentModel>(`${this.url}/${id}`, dept);
  }

  deleteDepartment(id: number): Observable<DepartmentModel> {
    console.log('Deleting department:', id);
    return this.http.delete<DepartmentModel>(`${this.url}/${id}`);
  }
}
