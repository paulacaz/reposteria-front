import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
})
export class RegistrarComponent {
  public formGroup: FormGroup;
  errors: string[] = [];
  usuario: any;
  loadingRegistro: boolean = false;
  mensajeRespuesta : string;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.construirFormulario();
  }

  private construirFormulario() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['TIPO_USUARIO', Validators.required],
      llaveSecreta: [''],
    });
  }

  guardar() {
    this.checkErrores();
    if (this.formGroup.invalid) {
      return;
    }

    this.loadingRegistro = true;
    this.usuarioService.registrar(this.formGroup.getRawValue()).subscribe({
      next: (response : any) => {      
        this.loadingRegistro = false;
        this.resetForm();
        this.mensajeRespuesta = response.mensaje
        this.registroExitoso();
      },
      error: (error : any) => {
        console.log(error)
        this.loadingRegistro = false;
        this.errors.push(error?.error?.mensaje || error?.message);
      },
    });
  }

  async checkErrores() {
    this.errors = [];

    if (this.formGroup.get('nombre')?.invalid) {
      let errorNombre = await firstValueFrom(this.translateService.get('VALIDACION_NOMBRE'));
      this.errors.push(
        errorNombre
      );
    }
    if (this.formGroup.get('correo')?.invalid) {
      let errorCorreo = await firstValueFrom(this.translateService.get('VALIDACION_CORREO'));
      this.errors.push(
        errorCorreo
      );
    }
    if (this.formGroup.get('password')?.invalid) {
      let errorContrasena = await firstValueFrom(this.translateService.get('VALIDACION_PASSWORD'));
      this.errors.push(
        errorContrasena
      );
    }
    if (this.formGroup.get('confirmPassword')?.invalid) {
      let errorConfirmarContraseña = await firstValueFrom(this.translateService.get('VALIDACION_CONFIRMAR_PASSWORD_VACIA'));
      this.errors.push(
        errorConfirmarContraseña
      );
    }
    if (
      this.formGroup.get('password')?.valid &&
      this.formGroup.get('confirmPassword')?.valid
    ) {
      if (
        this.formGroup.get('password')?.value !=
        this.formGroup.get('confirmPassword')?.value
      ) {
        let errorConfirmarContraseña = await firstValueFrom(this.translateService.get('VALIDACION_CONFIRMAR_PASSWORD_NO_IGUALES'));
        this.errors.push(
          errorConfirmarContraseña
        );
      }
    }
    if (
      this.formGroup.get('role')?.valid &&
      this.formGroup.get('role')?.value == 'TIPO_USUARIO'
    ) {
      let errorRol = await firstValueFrom(this.translateService.get('VALIDACION_ROL'));
      this.errors.push(
        errorRol
      );
    }
  }

  registroExitoso() {
    let modal = new window.bootstrap.Modal(
      document.getElementById('modalRegistroExitoso')
    );
    modal.show();
  }

  irALogin() {
    window.location.href="/login"

  }

  resetForm(){
    this.formGroup.reset();
    this.formGroup.get('role')?.setValue('TIPO_USUARIO');
  }
}
