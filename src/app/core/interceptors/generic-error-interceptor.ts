import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ModalService } from '../../shared/organisms/modal/modal.service';
import { genericError } from '../models/errors';

export const genericErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const modalService = inject(ModalService);
  return next(req).pipe(
    catchError((error) => {
      console.log('Generic error');

      modalService.display(genericError);
      return of(error);
    }),
  );
};
