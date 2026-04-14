import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../auth/login/login-dialog/login-dialog';
import { Login } from '../../services/auth/login';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterDialog } from '../auth/register/register-dialog/register-dialog';
@Component({
    selector: 'app-navbar',
    imports: [CommonModule, MenubarModule, ButtonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
    items: MenuItem[] = [];
    isLoggedIn = false;
    private destroy$ = new Subject<void>();

    constructor(
        private matDialog: MatDialog,
        public loginService: Login,
        private cdr: ChangeDetectorRef
    ) {}
    ngOnInit() {
        this.updateMenu();
        this.loginService.getAuthState()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.updateMenu());
    }

    updateMenu() {
        this.isLoggedIn = this.loginService.isLoggedIn();
        if (this.isLoggedIn&& this.loginService.isAdmin()) {
            this.items = [
                { label: 'Home', icon: 'pi pi-home', routerLink: [''] },
                { label: 'Departments', icon: 'pi pi-building', routerLink: ['/admin/departments'] },
                { label: 'Courses', icon: 'pi pi-book', routerLink: ['/admin/courses'] },
                { label: 'Students', icon: 'pi pi-users', routerLink: ['/admin/students'] }
            ];
        } else {
            this.items = [{ label: 'Home', icon: 'pi pi-home', routerLink: [''] }];
        }
        this.cdr.markForCheck();
    }

    handleLogout() {
        this.loginService.logout();
        this.updateMenu();
    }
    openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
        const dialogRef = this.matDialog.open(LoginDialog, {
            width: '400px',
            enterAnimationDuration,
            exitAnimationDuration
        });
        dialogRef.afterClosed().subscribe(() => {
            if (this.loginService.isLoggedIn()) {
                this.updateMenu();
            }
        });
    }
    openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
        this.matDialog.open(RegisterDialog, {
            width: '400px',
            enterAnimationDuration,
            exitAnimationDuration
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
