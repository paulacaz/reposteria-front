import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  show(mensaje: string, error: boolean) {
    const toastLiveExample = document.getElementById('liveToast');
    const messageElement = toastLiveExample?.querySelector('.toast-body');
    const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(
      toastLiveExample
    );
    if (messageElement) {
      messageElement.textContent = mensaje;
    }
    if (error) {
      toastLiveExample?.classList.replace('text-bg-success', 'text-bg-danger');
    } else {
      toastLiveExample?.classList.replace('text-bg-danger', 'text-bg-success');
    }
    toastBootstrap.show();
  }
}
