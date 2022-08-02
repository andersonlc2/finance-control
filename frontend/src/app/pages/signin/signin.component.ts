import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/models/Account';
import { User } from 'src/app/core/models/User';
import { AccountService } from 'src/app/core/service/account/shared/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
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


  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    try {
      if (this.passwordValidation()) {
        this.accountService.signIn(this.user).subscribe(user => {
          this.userCreated = user;

          this.login.email = this.user.email!;
          this.login.password = this.user.password!;

          this.accountService.createAccount(this.account, this.userCreated.id!).subscribe(acc => {

            console.log("Usuário e conta inicial criados com sucesso!");
          });

          this.makeLogin();
        });

      }
    } catch (error) {
      console.error(error);
    }

  }

  passwordValidation(): boolean {
    if (this.user.password === this.user.confirmPassword) {
      return true;
    }
    return false;
  }

  async makeLogin() {
    await this.accountService.login(this.login).then(() =>
      this.router.navigate([''])
    );
  }

}
