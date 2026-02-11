import { Component, inject } from '@angular/core';
import { ModalService } from './modal.service';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'bog-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  private readonly modalService = inject(ModalService);
  modalOptions = this.modalService.modalOptions;

  executeCommands(): void {
    this.modalOptions()!.commands?.forEach((command) => command.execute());
    this.modalOptions.set(null);
  }
}
