import { Directive, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[checkPermissions]',
})
export class CheckPermissionsDirective implements OnInit {
  @Input('role') role: string;

  constructor(private elRef: ElementRef, private loginService: LoginService) {}
  ngOnInit() {
    let session: any = this.loginService.getSession();

    let hasRole = session?.authorities?.filter(
      (a: any) => a?.authority == this.role
    );

    let validToken = this.loginService.estaAutenticado();

    if (hasRole?.length == 0 || !validToken) {
      this.elRef.nativeElement.style.display = 'none';
    }
  }
}
