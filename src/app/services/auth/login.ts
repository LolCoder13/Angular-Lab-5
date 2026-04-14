import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/auth/login-request';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../models/auth/login-response';
import { Register } from '../../models/auth/register';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private readonly apiUrl = 'http://localhost:5245/api/Student/Login';
  private authStateChanged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.authStateChanged.next(this.isLoggedIn());
  }
  login(loginRequest: LoginRequest) :Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiUrl, loginRequest);
  }
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
    this.authStateChanged.next(true);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  logout() {
    localStorage.removeItem('authToken');
    this.authStateChanged.next(false);
  }

  getAuthState(): Observable<boolean> {
    return this.authStateChanged.asObservable();
  }
  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    return decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'admin';
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    const exp = decodedToken?.exp;
    if (!exp) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  }
  register(registerRequest:Register){
    return this.http.post(`http://localhost:5245/api/Student/Register`,registerRequest);
  }
}
