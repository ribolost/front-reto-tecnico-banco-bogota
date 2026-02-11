import { Routes } from '@angular/router';
import { customersResolver } from '../../shared/resolvers/customers-resolver';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withRequestsMadeViaParent,
} from '@angular/common/http';
import { customerNotFoundInterceptor } from './interceptors/customer-not-found-interceptor';
import { accountGenericInterceptor } from './models/generic-interceptor';
import { AccountService } from '../../shared/services/account/account.service';
import { CustomersService } from '../../shared/services/customers/customers.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./account.component'),
    providers: [AccountService, CustomersService],
    resolve: {
      customers: customersResolver,
    },
  },
  {
    path: 'registro',
    loadComponent: () => import('./account-register/account-register.component'),
    providers: [
      AccountService,
      provideHttpClient(
        withRequestsMadeViaParent(),
        withFetch(),
        withInterceptors([accountGenericInterceptor(), customerNotFoundInterceptor]),
      ),
    ],
  },
];
