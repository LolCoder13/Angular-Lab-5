import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../models/department.model';
import { CreatedepartmentModel } from '../models/createdepartment.model';
import { Login } from './auth/login';

@Injectable({
  providedIn: 'root',
})
export class Department {
  private url = 'http://localhost:5245/api/Department';
  private headers: HttpHeaders;

  constructor(private http:HttpClient,private loginService:Login) {
    this.headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getToken()}`,
      'Custom-Header': 'my-value'
    });
  }

  getDepartments():Observable<DepartmentModel[]> {
    console.log('Fetching departments from API...');
    return this.http.get<DepartmentModel[]>(this.url, { headers: this.headers });
  }

  addDepartment(dept: DepartmentModel): Observable<CreatedepartmentModel> {
    console.log('Adding department:', dept);
    return this.http.post<CreatedepartmentModel>(this.url, dept, { headers: this.headers });
  }
  getDepartmentById(id: number): Observable<DepartmentModel> {
    console.log('Fetching department with ID:', id);
    return this.http.get<DepartmentModel>(`${this.url}/${id}`, { headers: this.headers });
  }
  updateDepartment(id: number, dept: DepartmentModel): Observable<DepartmentModel> {
    console.log('Updating department:', dept);
    return this.http.put<DepartmentModel>(`${this.url}/${id}`, dept, { headers: this.headers });
  }

  deleteDepartment(id: number): Observable<DepartmentModel> {
    console.log('Deleting department:', id);
    return this.http.delete<DepartmentModel>(`${this.url}/${id}`, { headers: this.headers });
  }
}
