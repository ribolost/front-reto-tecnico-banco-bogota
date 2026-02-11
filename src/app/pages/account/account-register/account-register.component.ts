import { Component, inject, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { take, tap } from 'rxjs';
import { AccountService } from '../../../shared/services/account/account.service';
import { Account, AccountStatus } from '../../../shared/models/account';

@Component({
  selector: 'app-account-register',
  standalone: true,
  imports: [CommonModule, FormField, RouterModule],
  templateUrl: './account-register.component.html',
  styleUrl: './account-register.component.scss',
})
export default class AccountRegisterComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  customerId = input<string>('', { alias: 'idCliente' });

  statusOptions = signal([
    { id: AccountStatus.ACTIVE, name: 'Activa' },
    { id: AccountStatus.INACTIVE, name: 'Inactiva' },
  ]);

  accountData = signal({
    status: AccountStatus.ACTIVE,
  });

  registerForm = form(this.accountData, (account) => {
    required(account.status, { message: 'El estado de la cuenta es obligatorio' });
  });

  isLoading = signal(false);
  showSuccess = signal(false);

  ngOnInit(): void {
    if (!this.customerId()) {
      this.router.navigate(['/cuentas']);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.registerForm().valid() || !this.customerId()) {
      return;
    }

    this.isLoading.set(true);
    const payload: Account = {
      customerId: this.customerId()!,
      status: this.accountData().status,
    };
    this.accountService
      .createAccount(payload)
      .pipe(
        tap(() => {
          this.showSuccess.set(true);
          this.isLoading.set(false);
          this.router.navigate(['/cuentas'], { queryParams: { idClient: this.customerId() } });
        }),
        take(1),
      )
      .subscribe();
  }
}
