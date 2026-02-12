import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Customer, DocumentType, DocumentTypes } from '../../../shared/models/customers';
import { CustomersService } from '../../../shared/services/customers/customers.service';
import { first, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/atoms/button/button.component';
import { InfoBlockComponent } from '../../../shared/molecules/info-block/info-block.component';
import { FormFieldComponent } from '../../../shared/molecules/form-field/form-field.component';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, FormField, ButtonComponent, FormFieldComponent],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.scss',
})
export default class CustomerRegisterComponent {
  private readonly customerService = inject(CustomersService);
  private readonly router = inject(Router);

  documentTypes = signal([
    { id: DocumentTypes.CC, name: 'Cédula de Ciudadanía' },
    { id: DocumentTypes.CE, name: 'Cédula de Extranjería' },
    { id: DocumentTypes.PAS, name: 'Pasaporte' },
  ]);

  customerData = signal<Customer>({
    documentType: '' as DocumentType,
    documentNumber: '',
    fullName: '',
    email: '',
  });

  registerForm = form(this.customerData, (customer) => {
    required(customer.documentNumber, { message: 'El número de documento es obligatorio' });
    required(customer.fullName, { message: 'El nombre completo es obligatorio' });
    required(customer.email, { message: 'El correo electrónico es obligatorio' });
    required(customer.documentType, { message: 'El tipo de documento es obligatorio' });
    email(customer.email, { message: 'El correo electrónico no es válido' });
  });

  isLoading = signal(false);
  showSuccess = signal(false);

  nextStep = signal<'list' | 'createAccount'>('list');

  setNextStep(step: 'list' | 'createAccount') {
    this.nextStep.set(step);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.registerForm().valid()) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.showSuccess.set(false);
    const customer = this.customerData();
    this.handleCustomerCreation(customer);
  }

  private handleCustomerCreation(customer: Customer): Subscription {
    return this.customerService
      .createCustomer(customer)
      .pipe(
        tap((response) => this.handleCustomerCreationResponse(response)),
        first(),
      )
      .subscribe();
  }

  private handleCustomerCreationResponse(customer: Customer) {
    this.showSuccess.set(true);
    this.resetForm();
    this.isLoading.set(false);

    if (this.nextStep() === 'createAccount') {
      this.router.navigate(['/cuentas/registro'], {
        queryParams: { idCliente: customer.id },
      });
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  resetForm(): void {
    this.registerForm().reset();
    this.customerData.set({
      documentType: '' as DocumentType,
      documentNumber: '',
      fullName: '',
      email: '',
    });
  }
}
