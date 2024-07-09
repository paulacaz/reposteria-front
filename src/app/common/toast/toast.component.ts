import { Component } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  show = false;
  title: string;
  message: string;
  type: string;

  constructor() {}

  showToast(title: string, message: string, error : boolean) {
    this.message = message;

    if (error) {
      this.type = 'danger';
    } else {
      this.type = 'success';
    }
  }

  hideToast() {
    this.show = false;
  }
}
