import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { AccountService } from '../../account/shared/account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
  ) { }

}
