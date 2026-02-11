import { Component, output } from '@angular/core';

@Component({
  selector: 'bog-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
