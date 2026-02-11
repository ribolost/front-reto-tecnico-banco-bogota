import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';
import { Account } from '../../models/account';

@Injectable()
export class AccountService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/accounts';

  getAccountByCustomer(customerId: number): Observable<Account | null> {
    return this.http
      .get<Account>(`${this.apiUrl}?customerId=${customerId}`, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Account>) => response.body),
        catchError((error) => {
          console.error('Error fetching account', error);
          return of(null);
        }),
      );
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }
}
