import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customers';
import { DocumentTypeBadgeComponent } from '../../atoms/document-type-badge/document-type-badge.component';

@Component({
  selector: 'bog-customers-table',
  standalone: true,
  imports: [CommonModule, DocumentTypeBadgeComponent],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  customers = input.required<Customer[]>();
}
