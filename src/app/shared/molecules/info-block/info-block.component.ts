import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bog-info-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-block.component.html',
  styleUrl: './info-block.component.scss',
})
export class InfoBlockComponent {
  label = input.required<string>();
  value = input.required<string>();
}
