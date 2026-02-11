import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'bog-document-type-badge',
  imports: [CommonModule],
  templateUrl: './document-type-badge.component.html',
  styleUrl: './document-type-badge.component.scss',
})
export class DocumentTypeBadgeComponent {
  documentType = input.required<string>();
}
