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
  userId: number = this.userAccountService.getId();
  accountId: number = 0;


  constructor(
    private accountService: AccountService,
    private userAccountService: UserAccountService
  ) { }

  ngOnInit(): void {
    this.name = this.accountService.getUserName();

    if (this.userId) {
      this.userAccountService.getAllTransactions(this.userId).subscribe(account => {
        this.accounts = account;
        this.accountId = Number(this.accounts[0].id);

      });
    }
  }

  onClick() {
    this.accountService.logout();
  }
}
