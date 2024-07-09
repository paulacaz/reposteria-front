import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
    providedIn: 'root',
  })
export class AuthGuardService {
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(): boolean {
    if (!this.loginService.estaAutenticado()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
