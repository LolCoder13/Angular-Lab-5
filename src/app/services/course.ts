import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course/course.model';
import { Login } from './auth/login';

@Injectable({
  providedIn: 'root',
})
export class Course {
  private url = 'http://localhost:5245/api/course';
  private headers: HttpHeaders;
  constructor(private http: HttpClient,private loginService:Login) {
     this.headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getToken()}`,
      'Custom-Header': 'my-value'
    });
   }
   loadCourses():Observable<CourseModel[]> {
    
    return this.http.get<CourseModel[]>(this.url,{ headers: this.headers });
  }
  addCourse(course: CourseModel): Observable<CourseModel> {
    return this.http.post<CourseModel>(this.url, course, { headers: this.headers });
  }
  getCourseById(id: number): Observable<CourseModel> {
    return this.http.get<CourseModel>(`${this.url}/${id}`, { headers: this.headers });
  }
  updateCourse(id: number, course: CourseModel): Observable<CourseModel> {
    return this.http.put<CourseModel>(`${this.url}/${id}`, course, { headers: this.headers });
  }
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.headers });
  }
  getStudentGrades(studentId: string): Observable<{ crsId: number; crsName: string; grade: number }[]> {
    return this.http.get<{ crsId: number; crsName: string; grade: number }[]>(`${this.url}/grades/${studentId}`, { headers: this.headers });
  }
  getStudentAssignedCourses(studentId: string): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(`${this.url}/StudentCourses/${studentId}`, { headers: this.headers });
  }
  assignCourseToStudent(studentId: string, courseId: number): Observable<void> {
    return this.http.post<void>(`${this.url}/Assign?crsId=${courseId}&stdId=${studentId}`, null, { headers: this.headers });
  }
  getAssignableCourses(studentId: string): Observable<{crsId: number; crsName: string}[]> {
    return this.http.get<{crsId: number; crsName: string}[]>(`${this.url}/AssignableCourses?id=${studentId}`, { headers: this.headers });
  }
}
