import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProdcutoService } from '../../../services/admin/admin-producto.service';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'admin-common-app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  @Input() parametrosDto: any = {};
  productoPage: any = { content: [] };
  paginaActual: number = 1;
  productoForm: FormGroup;
  modoEdicion: boolean = false;
  categorias: any[] = [];

  constructor(
    private productoService: AdminProdcutoService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.construirFormulario();
    this.getCategorias();
  }

  private getCategorias() {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
  }

  private construirFormulario() {
    this.productoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: [''],
      imagen: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: [null, Validators.required],
    });
  }

  compareCategorias(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getProductos() {
    if (this.parametrosDto?.pagina) {
      this.paginaActual = this.parametrosDto.pagina;
    }
    this.parametrosDto.pagina = this.paginaActual - 1;
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

  onSubmit() {
    if (this.modoEdicion) {
      this.actualizarProducto();
    } else {
      this.guardarProducto();
    }
  }

  guardarProducto() {
    if (this.productoForm.invalid) {
      return;
    }
    this.productoService
      .crearProductos(this.productoForm.getRawValue())
      .subscribe((data: any) => {
        this.getProductos();
        this.productoForm.reset();
        this.mostrarMensaje('Producto guardado correctamente', false);
      });
  }

  actualizarProducto() {
    if (this.productoForm.invalid) {
      return;
    }
    this.productoService
      .actualizarProducto(this.productoForm.getRawValue())
      .subscribe((data: any) => {
        this.getProductos();
        this.productoForm.reset();
        this.modoEdicion = false;
        this.mostrarMensaje('Producto actualizado correctamente', false);
      });
  }

  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe((data: any) => {
      this.getProductos();
      this.mostrarMensaje('Producto eliminado correctamente', false);
    });
  }

  mostrarMensaje(mensaje: string, error: boolean) {
    this.toast.show(mensaje, error);
  }

  seleccionarProducto(producto: any) {
    this.productoForm.patchValue(producto);
    this.modoEdicion = true;
  }

  cancelarEdicion() {
    this.resetEdicion();
  }

  private resetEdicion() {
    this.productoForm.reset();
    this.modoEdicion = false;
  }
}
