import { ResolveFn } from '@angular/router';
import { CustomersService } from '../services/customers/customers.service';
import { inject } from '@angular/core';
import { Customer } from '../models/customers';
import { Observable } from 'rxjs';

export const customersResolver: ResolveFn<Observable<Customer[] | undefined>> = () => {
  const customersService = inject(CustomersService);

  return customersService.getAllCustomers();
};
