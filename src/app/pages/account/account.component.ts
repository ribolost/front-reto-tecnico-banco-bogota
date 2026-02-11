import {
  Component,
  input,
  signal,
  inject,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../shared/models/account';
import { Customer } from '../../shared/models/customers';
import { AccountService } from '../../shared/services/account/account.service';
import { SpinnerComponent } from '../../shared/atoms/spinner/spinner.component';
import { first, tap } from 'rxjs';
import { ButtonComponent } from '../../shared/atoms/button/button.component';

@Component({
  selector: 'bog-account',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, ButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  customers = input.required<Customer[]>();

  customerId = input<string>('', { alias: 'idCliente' });

  searchQuery = signal('');
  selectedCustomer = signal<Customer | null>(null);
  currentAccount = signal<Account | null>(null);

  isLoading = signal(false);
  hasSearched = signal(false);
  isDropdownOpen = signal(false);

  filteredCustomers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.customers().filter((c) => {
      const searchStr = `${c.documentType} ${c.documentNumber} ${c.fullName}`.toLowerCase();
      return searchStr.includes(query);
    });
  });

  formattedSelectedCustomer = computed(() => {
    const c = this.selectedCustomer();
    if (!c) return '';
    return `${c.documentType} - ${c.documentNumber} - ${c.fullName}`;
  });

  constructor() {
    effect(() => {
      const paramId = this.customerId();
      const allCustomers = this.customers();

      if (paramId && allCustomers.length > 0) {
        const found = allCustomers.find((customer) => customer.id === Number(paramId));
        if (found) {
          this.selectCustomer(found);
        }
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update((v) => !v);
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer.set(customer);
    this.searchQuery.set('');
    this.isDropdownOpen.set(false);
    this.consultAccount(customer.id!);
  }

  private consultAccount(customerId: number): void {
    this.isLoading.set(true);
    this.hasSearched.set(false);
    this.currentAccount.set(null);

    this.accountService
      .getAccountByCustomer(customerId)
      .pipe(
        tap((account) => {
          this.currentAccount.set(account);
          this.hasSearched.set(true);
          this.isLoading.set(false);
        }),
        first(),
      )
      .subscribe();
  }

  navigateToCreateAccount(): void {
    const customer = this.selectedCustomer();
    if (customer) {
      this.router.navigate(['/cuentas/registro'], {
        queryParams: { idCliente: customer.id },
      });
    }
  }
}
