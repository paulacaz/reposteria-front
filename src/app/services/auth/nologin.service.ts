import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
    providedIn: 'root',
  })
export class NoLoginGuardService {
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(): boolean {
    if (this.loginService.estaAutenticado()) {
      this.router.navigate(['home']);
      return false;
    }
    this.loginService.cerrarSession();
    return true;
  }
}
