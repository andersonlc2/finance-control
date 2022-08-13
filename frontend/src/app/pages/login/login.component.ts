import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/core/service/account/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  login = {
    email: '',
    password: ''
  }
  token: string = '';
  error: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.loading = true;
    try {
      const result = await this.accountService.login(this.login);
      this.loading = false;
      this.router.navigate(['']);
    } catch (error) {
      this.error = '';
      this.loading = false;
      this.error = `Dados incorretos. Confira seu usuário e senha e tente novamente.`;
    }

  }

}
