import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/core/models/User';
import { Account } from 'src/app/core/models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any) {

    const token = await this.http.post(`${environment.api}/login`, user, { responseType: 'text' }).toPromise();

    if (token) {
      window.localStorage.setItem('token', token);
      return true;
    }

    return false;
  }

  signIn(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/users`, user);

  }

  createAccount(account: Account, userId: number): Observable<Account> {
    return this.http.post<Account>(`${environment.api}/users/${userId}/accounts`, account);
  }

  logout() {
    window.localStorage.removeItem('token');
  }

  getAuthorizationToken() {
    return window.localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date!.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  getUserName(): string {
    const token = this.getAuthorizationToken();
    const decoded: any = jwt_decode(token!);

    return decoded.name;
  }
}


