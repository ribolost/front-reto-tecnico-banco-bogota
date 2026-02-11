import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'danger';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'bog-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  // Inputs con Signals
  label = input<string>(); // Opcional: si no se usa ng-content
  type = input<ButtonType>('button');
  variant = input<ButtonVariant>('primary');
  disabled = input(false);
  isLoading = input(false);
  block = input(false); // Para ocupar el 100% del ancho

  // Outputs
  clicked = output<void>();

  onClick(event: Event): void {
    // Si está deshabilitado o cargando, prevenimos el clic
    if (this.disabled() || this.isLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit();
  }
}
