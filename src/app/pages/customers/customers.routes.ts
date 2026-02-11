import { Routes } from '@angular/router';
import { customersResolver } from '../../shared/resolvers/customers-resolver';
import { CustomersService } from '../../shared/services/customers/customers.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customers.component'),
    providers: [CustomersService],
    resolve: {
      customers: customersResolver,
    },
  },
  {
    path: 'registro',
    loadComponent: () => import('./customer-register/customer-register.component'),
    providers: [CustomersService],
  },
];
