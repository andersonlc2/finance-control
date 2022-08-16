import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthBalance } from 'src/app/core/models/Balances';
import { AnnualReportsMonth, TotalExpenses } from 'src/app/core/models/ChartsModels';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(
    private http: HttpClient
  ) { }

  getAnnualReports(): Observable<AnnualReportsMonth[]> {
    return this.http.get<AnnualReportsMonth[]>(`${environment.api}/accounts/1/annual-report-response`);
  }

  getTotalExpenses(): Observable<TotalExpenses[]> {
    return this.http.get<TotalExpenses[]>(`${environment.api}/accounts/1/total-expenses`);
  }

  getAllBalances(): Observable<MonthBalance[]> {
    return this.http.get<MonthBalance[]>(`${environment.api}/accounts/1/all-balances`);
  }
}
