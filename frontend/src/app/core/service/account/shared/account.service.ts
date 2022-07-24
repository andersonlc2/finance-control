import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


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

  createAccount(account: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }

}
