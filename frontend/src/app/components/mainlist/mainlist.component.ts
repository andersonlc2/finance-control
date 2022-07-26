import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { TransactionService } from 'src/app/core/service/transaction/shared/transaction.service';
import { UserAccountService } from 'src/app/core/service/useAccount/shared/user-account.service';

@Component({
  selector: 'app-mainlist',
  templateUrl: './mainlist.component.html',
  styleUrls: ['./mainlist.component.scss']
})
export class MainlistComponent implements OnInit {

  accounts: Account[] = [];
  hiddenExtract: Boolean = true;

  constructor(
    private userAccountService: UserAccountService
  ) { }

  ngOnInit(): void {
    let id = this.userAccountService.getId();
    this.userAccountService.getAllTransactions(id).subscribe(account => {
      this.accounts = account;

    });
  }

  onClick() {
    this.hiddenExtract = !this.hiddenExtract;


  }

}
