import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/models/Account';
import { error, objectError } from 'src/app/core/models/Erros';
import { User } from 'src/app/core/models/User';
import { AccountService } from 'src/app/core/service/account/shared/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loading: boolean = false;
  user: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    deletedFlg: "",
    deletedAt: ""
  }

  userCreated: User = {}

  login = {
    email: '',
    password: ''
  }

  account: Account = {
    id: "",
    accountType: "PESSOAL",
    balance: 0,
    limit: 0
  }

  error: error = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  respError: objectError;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    if (this.user.confirmPassword !== this.user.password) {
      this.error.confirmPassword = "As senhas não conferem";
    }

    if (this.passwordValidation()) {
      this.accountService.signIn(this.user).subscribe(user => {

        this.userCreated = user;

        this.login.email = this.user.email!;
        this.login.password = this.user.password!;

        this.accountService.createAccount(this.account, this.userCreated.id!).subscribe(acc => {

        });

        this.makeLogin();
      },
        err => {
          this.loading = false;
          this.respError = err.error;

          this.error = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }

          this.respError.fields.forEach(field => {
            switch (field.name) {
              case 'name':
                this.error.name = field.message
                break;
              case 'email':
                this.error.email = field.message
                break;
              case 'password':
                this.error.password = field.message
                break;
            }

          })

        }
      );

    }

  }

  passwordValidation(): boolean {
    if (this.user.password === this.user.confirmPassword) {
      return true;
    }
    return false;
  }

  async makeLogin() {
    await this.accountService.login(this.login).then(() => {
      this.loading = false;
      this.router.navigate(['']);
    });
  }

}
