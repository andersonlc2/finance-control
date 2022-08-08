import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/Account';
import { TransactionPages } from 'src/app/core/models/Transaction';
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
  transactions: TransactionPages;
  isEmpty: Boolean = false;

  constructor(
    private userAccountService: UserAccountService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    let id = this.userAccountService.getId();
    this.userAccountService.getAllTransactions(id).subscribe(account => {
      this.accounts = account;
      if (this.accounts) {
        this.getTransactions();
      }
    });
  }

  getTransactions() {
    try {
      this.transactionService.getTransactionsList(Number(this.accounts[0].id)).subscribe(transactions => {
        if (transactions.empty) {
          this.isEmpty = true;
        }

      });
    } catch (error) {
      console.error(error);
    }
  }

  onClick() {
    this.hiddenExtract = !this.hiddenExtract;

  }

}
