import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerCreationResponse } from '../../models/customers';

@Injectable()
export class CustomersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/customers';

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`);
  }

  createCustomer(newCustomer: Customer): Observable<CustomerCreationResponse> {
    return this.http.post<CustomerCreationResponse>(`${this.apiUrl}`, newCustomer);
  }
}
