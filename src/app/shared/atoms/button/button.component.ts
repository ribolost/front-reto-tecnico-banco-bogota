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
  label = input<string>();
  type = input<ButtonType>('button');
  variant = input<ButtonVariant>('primary');
  disabled = input(false);
  isLoading = input(false);
  block = input(false);
  clicked = output<void>();

  onClick(event: Event): void {
    if (this.disabled() || this.isLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit();
  }
}
