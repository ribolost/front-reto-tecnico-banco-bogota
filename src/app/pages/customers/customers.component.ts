import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersTableComponent } from '../../shared/organisms/customers-table/customers-table.component';
import { Customer } from '../../shared/models/customers';
import { ButtonComponent } from '../../shared/atoms/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'bog-customers',
  standalone: true,
  imports: [CommonModule, CustomersTableComponent, ButtonComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export default class CustomersComponent {
  private readonly router = inject(Router);
  customers = input.required<Customer[]>();

  createCustomer(): void {
    console.log('Creando nuevo cliente');
    this.router.navigate(['/clientes/registro']);
  }
}
