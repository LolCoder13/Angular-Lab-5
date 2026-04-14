import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from '../models/student/student.model';
import { Login } from './auth/login';

@Injectable({
  providedIn: 'root',
})
export class Student {
  private url = 'http://localhost:5245/api/Student';
  private headers: HttpHeaders;

  constructor(private http: HttpClient,private loginService:Login) {
    this.headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getToken()}`,
      'Custom-Header': 'my-value'
    });
  }
  getAllStudents():Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(`${this.url}/GetAll`, { headers: this.headers });
  }
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.headers });
  }
  gradeStudent(studentId: string, courseId: number, grade: number): Observable<void> {
    const payload = { grade };
    return this.http.post<void>(`http://localhost:5245/api/Course/${courseId}/students/${studentId}/grade`, payload, { headers: this.headers });
  }
}
