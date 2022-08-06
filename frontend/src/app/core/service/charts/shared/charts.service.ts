import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnualReportsMonth } from 'src/app/core/models/ChartsModels';
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

}
