import { HttpInterceptorFn } from '@angular/common/http';
import { InjectionToken, signal, WritableSignal } from '@angular/core';

export const GENERIC__INTERCEPTOR = new InjectionToken<HttpInterceptorFn>('GeneralInterceptor');

export const accountGenericInterceptorSignal: WritableSignal<HttpInterceptorFn> =
  signal<HttpInterceptorFn>((req, next) => {
    console.log('Request made with third general interceptor from signal:', req);
    return next(req);
  });

export const accountGenericInterceptor: WritableSignal<HttpInterceptorFn> =
  signal<HttpInterceptorFn>((req, next) => {
    return accountGenericInterceptorSignal()(req, next);
  });
