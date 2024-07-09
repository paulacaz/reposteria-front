import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  @Input() parametrosDto: any = {};
  productoPage: any = { content: [] };
  paginaActual: number = 1;
  itemsPorPaginaSelect: number[] = [5, 10, 20];
  itemsPorPagina: number = 5;
  criteriosOrdenamiento: any[] = [
    {
      desc: 'Precio: bajo a alto',
      value: 'precioAsc',
    },
    {
      desc: 'Precio: alto a bajo',
      value: 'precioDesc',
    },
  ];
  seleccionOrdenamiento: any = this.criteriosOrdenamiento[0].value;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    if (this.parametrosDto?.pagina) {
      this.paginaActual = this.parametrosDto.pagina;
    }
    this.parametrosDto.pagina = this.paginaActual - 1;
    this.parametrosDto.ordenarPor = this.seleccionOrdenamiento;
    this.parametrosDto.itemsPorPagina = this.itemsPorPagina;
    this.productoService
      .getProductos(this.parametrosDto)
      .subscribe((data: any) => {
        this.productoPage = data;
        this.clearRequestPage();
      });
  }

  getPages() {
    return Array.from(
      { length: this.productoPage?.totalPages },
      (_, i) => i + 1
    );
  }

  paginaAnterior() {
    if (this.paginaActual === 1) return;
    this.paginaActual--;
    this.getProductos();
  }

  siguientePagina() {
    if (this.paginaActual === this.productoPage.totalPages) return;
    this.paginaActual++;
    this.getProductos();
  }

  cambiarPaginaEvento(pagina: number) {
    this.paginaActual = pagina;
    this.getProductos();
  }

  private clearRequestPage() {
    this.parametrosDto.pagina = 0;
  }
}
