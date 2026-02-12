import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldState } from '@angular/forms/signals';
import { DEFAULT_ERROR_MAP } from './form-field-errors';

@Component({
  selector: 'bog-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent<T = unknown> {
  label = input.required<string>();
  inputId = input.required<string>();
  controlState = input.required<FieldState<T>>();

  readonly showError = computed(() => {
    const controlState = this.controlState();
    return controlState.touched() && controlState.invalid();
  });

  readonly errorMessages = computed<string[]>(() => {
    const controlState = this.controlState();
    const errors = controlState.errors();

    if (!errors) return [];

    return Object.entries(errors).map(([key, err]) => {
      return this.getErrorMessage(key, err);
    });
  });

  private getErrorMessage(key: string, err: any): string {
    if (err.message) {
      return err.message;
    }
    console.log('Error key:', key, 'Error value:', err);
    const mapper = DEFAULT_ERROR_MAP[key];
    return mapper ? mapper(err) : 'Valor inválido';
  }
}
