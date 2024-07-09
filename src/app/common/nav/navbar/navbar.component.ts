import { Component } from '@angular/core';
import { ScrollService } from '../../../services/scroll.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  idioma: string = '';
  usuario : string;

  autenticado : boolean = false;

  constructor(
    private scrollService: ScrollService,
    private translateService: TranslateService,
    public loginService : LoginService
  ) {

    this.autenticado = loginService.estaAutenticado();
    this.usuario = loginService.getSession()?.nombre;

  }

  salir(){
    this.loginService.cerrarSession();
    window.location.href = "/inicio"
  }


  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
