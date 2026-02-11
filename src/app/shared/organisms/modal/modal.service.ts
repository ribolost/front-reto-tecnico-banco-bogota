import { Injectable, signal } from '@angular/core';
import { ModalOptions } from '../../models/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalOptions = signal<ModalOptions | null>(null);

  display(options: ModalOptions): void {
    this.modalOptions.set(options);
  }

  hide(): void {
    this.modalOptions.set(null);
  }
}
