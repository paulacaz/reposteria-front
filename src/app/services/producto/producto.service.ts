import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  API = environment.host + '/api/public/producto';

  constructor(private client: HttpClient) {}

  getProductos(buscarProductoRequestDto: any) {
    return this.client.post(this.API + '/list', buscarProductoRequestDto);
  }
}
