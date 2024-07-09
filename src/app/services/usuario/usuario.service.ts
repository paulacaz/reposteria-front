import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  API = environment.host + '/api/usuario';

  constructor(private httpClient: HttpClient) {}

  registrar(usuario: any) {
    return this.httpClient.post(this.API + '/registro', usuario);
  }

  listado() {
    return this.httpClient.get(this.API);
  }
}
