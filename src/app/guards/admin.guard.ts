import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Login } from '../services/auth/login';

export const adminGuard: CanActivateFn = () => {
  const loginService = inject(Login);
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.isAdmin()) {
    return true;
  }

  return router.parseUrl('Unauthorized');
};

export const adminChildGuard: CanActivateChildFn = () => {
  const loginService = inject(Login);
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.isAdmin()) {
    return true;
  }

  return router.parseUrl('Unauthorized');
};