import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminProdcutoService {


  API = environment.host + '/api/admin/productos';

  constructor(private client: HttpClient) {}

  getProductos(buscarProductoRequestDto: any) {
    return this.client.post(this.API + '/list', buscarProductoRequestDto);
  }

  crearProductos(data: any) {
    return this.client.post(this.API, data);
  }

  actualizarProducto(data: any) {
    return this.client.put(this.API, data);
  }

  eliminarProducto(id: number) {
    return this.client.delete(this.API + '/' + id);
  }
}
