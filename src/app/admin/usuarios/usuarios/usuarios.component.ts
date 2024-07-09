import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any[];

  constructor(private usuarioService: UsuarioService) {
    usuarioService.listado().subscribe((response: any) => {
      this.usuarios = response.datos;
    });
  }
}
