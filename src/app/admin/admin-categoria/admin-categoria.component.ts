import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoriaService } from '../../services/admin/admin-categoria.service';
import { ToastComponent } from '../../common/toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrl: './admin-categoria.component.css',
})
export class AdminCategoriaComponent {

  modoEdicion: boolean = false;
  categorias: any[] = [];

  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriaService: AdminCategoriaService,
    private toast : ToastService
  ) {
    this.categoriaForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: [''],
    });

    this.listarCategorias();
  }

  onSubmit() {
    if (this.modoEdicion) {
      this.actualizarCategoria();
    } else {
      this.guardarCategoria();
    }
  }

  cancelarEdicion() {
    this.resetEdicion();
  }

  private resetEdicion() {
    this.categoriaForm.reset();
    this.modoEdicion = false;
  }

  private actualizarCategoria() {
    this.categoriaService
      .updateCategoria(this.categoriaForm.value)
      .subscribe((res: any) => {
        this.listarCategorias();
        this.categoriaForm.reset();
        this.modoEdicion = false;
        this.mostrarMensaje('Categoria actualizada correctamente', false);
      });
  }

  private guardarCategoria() {
    this.categoriaService
      .createCategoria(this.categoriaForm.value)
      .subscribe((res: any) => {
        this.listarCategorias();
        this.categoriaForm.reset();
        this.mostrarMensaje('Categoria guardada correctamente', false);
      });
  }

  listarCategorias() {
    this.categoriaService.getCategorias().subscribe((res: any) => {
      this.categorias = res.datos;
    });
  }

  seleccionarCategoria(categoria: any) {
    this.categoriaForm.patchValue(categoria);
    this.modoEdicion = true;
  }

  eliminarCategoria(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe(
      (res: any) => {
        this.listarCategorias();
        this.mostrarMensaje('Categoria eliminada correctamente', false);
      },
      (error) => {
        this.mostrarMensaje(error.error.mensaje, true);
      }
    );
  }

  mostrarMensaje(mensaje: string, error: boolean) {
    this.toast.show(mensaje, error);
  }
}
