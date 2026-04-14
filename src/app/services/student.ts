import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from '../models/student/student.model';

@Injectable({
  providedIn: 'root',
})
export class Student {
  private url = 'http://localhost:5245/api/Student';
  
  constructor(private http: HttpClient) {}
  getAllStudents():Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(`${this.url}/GetAll`);
  }
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  gradeStudent(studentId: string, courseId: number, grade: number): Observable<void> {
    const payload = { grade };
    return this.http.post<void>(`http://localhost:5245/api/Course/${courseId}/students/${studentId}/grade`, payload);
  }
}
