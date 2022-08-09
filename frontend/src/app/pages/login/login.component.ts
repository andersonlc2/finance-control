import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/core/service/account/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = {
    email: '',
    password: ''
  }
  token: string = '';
  error: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);

      this.router.navigate(['']);
    } catch (error) {
      this.error = '';
      this.error = `Dados incorretos. Confira seu usuário e senha e tente novamente.`;
    }

  }

}
