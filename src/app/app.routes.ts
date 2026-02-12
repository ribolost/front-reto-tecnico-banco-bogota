import { Routes } from '@angular/router';
import { accountGenericInterceptorSignal } from './pages/account/models/generic-interceptor';
import { genericErrorInterceptor } from './core/interceptors/generic-error-interceptor';

export const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./pages/customers/customers.routes').then((m) => m.routes),
  },
  {
    path: 'cuentas',
    loadChildren: () =>
      import('./pages/account/account.routes').then((m) => {
        accountGenericInterceptorSignal.set(genericErrorInterceptor);
        return m.routes;
      }),
  },
  { path: '**', redirectTo: 'clientes', pathMatch: 'full' },
];
