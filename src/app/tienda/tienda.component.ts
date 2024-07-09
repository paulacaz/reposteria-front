import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../services/producto/producto.service';
import { ProductoComponent } from '../common/producto/producto.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css',
})
export class TiendaComponent implements OnInit {

  filtrosProducto: any = {};

  rangosPrecios: string[] = ['0-50', '51-100', '101-200', '200+'];
  seleccion: string = this.rangosPrecios[0];

  @ViewChild(ProductoComponent) productoComponent!: ProductoComponent;

  constructor() {}

  ngOnInit(): void {}

  categoriasSeleccionadas(event: any) {
    this.filtrosProducto.idsCategoria = event.map((categoria: any) => categoria.id);
    this.filtrosProducto.pagina = 1;
    this.productoComponent.getProductos();
  }
}
