import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { LoginComponent } from '../feature/login/login.component';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  canActivate() {
    if (this.authService.IsLoggedIn()) {
      return true;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-white';
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.afterOpened().subscribe(() => this.router.navigate(['/']));
    return dialogRef.afterClosed().pipe(
      switchMap((result) => {
        console.log('dialog was closed');
        if (this.authService.IsLoggedIn()) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}
