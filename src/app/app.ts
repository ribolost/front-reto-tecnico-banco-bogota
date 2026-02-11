import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLayoutComponent } from './shared/templates/admin-layout/admin-layout.component';
import { ModalComponent } from './shared/organisms/modal/modal.component';

@Component({
  selector: 'bog-root',
  imports: [RouterOutlet, AdminLayoutComponent, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Onboarding de Clientes');
}
