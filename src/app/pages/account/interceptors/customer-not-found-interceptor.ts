import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { ModalService } from '../../../shared/organisms/modal/modal.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { customerNotFoundError } from '../models/errors';
import { ModalOptions } from '../../../shared/models/modal';
import { RouterNavigationCommand } from '../../../shared/models/commands/router-navigation.command';

export const customerNotFoundInterceptor: HttpInterceptorFn = (req, next) => {
  const modalService = inject(ModalService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 404) {
        return throwError(() => error);
      }

      const modalOptions: ModalOptions = {
        ...customerNotFoundError,
        commands: [new RouterNavigationCommand(router, '/cuentas')],
      };
      modalService.display(modalOptions);
      return of(
        new HttpResponse({
          body: error,
        }),
      );
    }),
  );
};
