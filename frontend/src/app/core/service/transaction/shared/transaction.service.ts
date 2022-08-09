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

  getTransactionById(accountId: number, transactionId: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${environment.api}/accounts/${accountId}/transaction/${transactionId}`);
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

    try {
      transaction.dueDate = new Date(transaction.dueDate!).toISOString();
    } catch (err) {
      transaction.dueDate = new Date().toISOString();
    }

    transaction.debitOrCredit = this.getDebitOrCredit(transaction.debitOrCredit!);

    if (transaction.id) {
      return this.http.put<Transaction>(`${environment.api}/accounts/${id}/transaction/${transaction.id}`, transaction);
    }

    return this.http.post<Transaction>(`${environment.api}/accounts/${id}`, transaction);
  }

  getDebitOrCredit(debitOrCredit: string): string {
    if (debitOrCredit == "1") {
      return "D";
    } else {
      return "C";
    }
  }

  update(id: number, transaction: Transaction): Transaction {
    let transactionUpdated = new Transaction();

    transaction.dueDate = new Date(transaction.dueDate!).toISOString();
    transaction.debitOrCredit = this.getDebitOrCredit(transaction.debitOrCredit!);

    this.http.put<Transaction>(`${environment.api}/accounts/${id}/transaction/${transaction.id}`, transaction)
      .subscribe(transaction => {
        transactionUpdated = transaction;
        transactionUpdated.dueDate = this.getDateString(transactionUpdated.dueDate!);
      });

    return transactionUpdated;
  }

  delete(accountId: number, transactionId: number): void {
    this.http.delete(`${environment.api}/accounts/${accountId}/transaction/${transactionId}`).subscribe();
  }

  getDateString(date: string): string {
    let dateUtc = new Date(date!);
    dateUtc.setHours(dateUtc.getHours() + 3);

    return dateUtc.toISOString().substring(0, 10);
  }

  getTransactionsList(id: number): Observable<TransactionPages> {

    return this.http.get<TransactionPages>(`${environment.api}/accounts/${id}`);
  }

}
