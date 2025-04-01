import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';
import { CommonModule } from '@angular/common';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-frontend';

  constructor(private toastService: ToastService) {}

  showSuccessToast() {
    this.toastService.addToast('success', 'Successful operation');
  }

  showErrorToast() {
    this.toastService.addToast('error', 'Error: An error has occurred');
  }

  showInfoToast() {
    this.toastService.addToast('info', 'This is an information message');
  }
  showWarnToast() {
    this.toastService.addToast('warning', 'Warning: warning message');
  }
}
