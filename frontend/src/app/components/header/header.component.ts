import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { AccountService } from 'src/app/core/service/account/shared/account.service';
import { UserAccountService } from 'src/app/core/service/useAccount/shared/user-account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = 'Usuário';
  accounts: Account[] = [];

  constructor(
    private accountService: AccountService,
    private userAccountService: UserAccountService
  ) { }

  ngOnInit(): void {
    this.name = this.accountService.getUserName();

    let id = this.userAccountService.getId();
    this.userAccountService.getAllTransactions(id).subscribe(account => {
      this.accounts = account;

    });
  }

  onClick() {
    this.accountService.logout();
  }
}
