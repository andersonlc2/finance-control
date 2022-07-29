import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Transaction, TransactionPages } from 'src/app/core/models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllTransactions(id: number): Observable<TransactionPages> {
    return this.http.get<TransactionPages>(`${environment.api}/accounts/${id}`);
  }

}
