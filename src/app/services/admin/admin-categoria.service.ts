import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriaService {


  API = environment.host + '/api/admin/categorias';

  constructor(private client: HttpClient) {}

  getCategorias() {
    return this.client.get(this.API);
  }

  createCategoria(data: any) {
    return this.client.post(this.API, data);
  }

  updateCategoria(data: any) {
    return this.client.put(this.API, data);
  }

  deleteCategoria(id: number) {
    return this.client.delete(this.API + '/' + id);
  }
}
