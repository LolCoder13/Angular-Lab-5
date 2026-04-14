import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course/course.model';

@Injectable({
  providedIn: 'root',
})
export class Course {
  private url = 'http://localhost:5245/api/course';
  constructor(private http: HttpClient) {

   }
   loadCourses():Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(this.url);
  }
  addCourse(course: CourseModel): Observable<CourseModel> {
    return this.http.post<CourseModel>(this.url, course);
  }
  getCourseById(id: number): Observable<CourseModel> {
    return this.http.get<CourseModel>(`${this.url}/${id}`);
  }
  updateCourse(id: number, course: CourseModel): Observable<CourseModel> {
    return this.http.put<CourseModel>(`${this.url}/${id}`, course);
  }
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  getStudentGrades(studentId: string): Observable<{ crsId: number; crsName: string; grade: number }[]> {
    return this.http.get<{ crsId: number; crsName: string; grade: number }[]>(`${this.url}/grades/${studentId}`);
  }
}
