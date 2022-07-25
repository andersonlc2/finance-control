import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../account/shared/account.service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  account: Account = new Account();

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  getAllTransactions(id: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.api}/users/${id}/accounts`);
  }

  getId(): number {
    const token = this.accountService.getAuthorizationToken();
    const decoded: any = jwt_decode(token!);
    return decoded.id;
  }
}
