import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Transaction, TransactionPages, Type } from 'src/app/core/models/Transaction';
import { Balances } from 'src/app/core/models/Balances';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTransactions(id: number, year: number, month: number): Observable<TransactionPages> {
    let data = new HttpParams();
    data.append("year", year);
    data.append("month", month);

    return this.http.get<TransactionPages>(`${environment.api}/accounts/${id}/date?month=${month}&year=${year}`);
  }

  getBalances(id: number, year: number, month: number): Observable<Balances> {
    let data = new HttpParams();
    data.append("year", year);
    data.append("month", month);

    return this.http.get<Balances>(`${environment.api}/accounts/${id}/balanceMonth?month=${month}&year=${year}`)
  }

  getTypes(): Observable<Type[]> {

    return this.http.get<Type[]>(`${environment.api}/transactions-type`);
  }

  save(id: number, transaction: Transaction): Observable<Transaction> {

    console.log(transaction);

    return this.http.post<Transaction>(`${environment.api}/accounts/${id}`, transaction);
  }
}
