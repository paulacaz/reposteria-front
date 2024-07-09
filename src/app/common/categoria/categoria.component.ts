import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {
  
  @Output() categoriasSeleccionadas = new EventEmitter<any>();

  categorias: any = [];

  constructor(private categoriaService: CategoriaService) {}
  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
  }

  enviarDatos() {
    const datos = this.categorias.filter((categoria: any) => categoria.checked);
    this.categoriasSeleccionadas.emit(datos);
  }

  seleccionDeCategoria(event: any, categoria: any) {
    categoria.checked = event.target.checked;
    this.enviarDatos();
  }
}
