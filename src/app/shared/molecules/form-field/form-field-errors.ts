import { ValidationErrors } from '@angular/forms';

type ErrorValue = ValidationErrors[string];

export const DEFAULT_ERROR_MAP: Record<string, (err: ErrorValue) => string> = {
  required: () => 'Este campo es obligatorio',
  email: () => 'Correo electrónico inválido',
  pattern: () => 'El formato no es válido',
  minlength: (err) => `Mínimo ${(err as { requiredLength: number }).requiredLength} caracteres`,
};
