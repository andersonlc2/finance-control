import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Transaction, TransactionPages } from 'src/app/core/models/Transaction';
import { Route, Router } from '@angular/router';

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

}
