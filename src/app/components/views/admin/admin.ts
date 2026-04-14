import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Login } from '../../../services/auth/login';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private loginService: Login, private router: Router) {}

  ngOnInit(): void {
    this.ensureAuthorized();
    this.loginService
      .getAuthState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.ensureAuthorized());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private ensureAuthorized(): void {
    if (!this.loginService.isLoggedIn() || !this.loginService.isAdmin()) {
      this.router.navigate(['/Unauthorized']);
    }
  }
}
