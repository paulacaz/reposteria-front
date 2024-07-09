import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API = environment.host + '/api/public/categoria';

  constructor(private client: HttpClient) {}

  getCategorias() {
    return this.client.get(this.API);
  }
}
