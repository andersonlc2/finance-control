import { Component, OnInit } from "@angular/core";
import { TransactionService } from "src/app/core/service/transaction/shared/transaction.service";
import { UserAccountService } from "src/app/core/service/useAccount/shared/user-account.service";


export const COLOR_PALLETE = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0']

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  loading: boolean = false;
  userId: number = this.userAccountService.getId();
  accountId: number = 0;
  isEmpty: boolean = false;
  balance: number = 0;
  year: number = new Date().getFullYear();

  constructor(
    private transactionService: TransactionService,
    private userAccountService: UserAccountService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    if (this.userId) {
      this.userAccountService.getAllTransactions(this.userId).subscribe(account => {
        this.accountId = Number(account[0].id);
        this.balance = Number(account[0].balance);

        this.getTransactions();
      });
    }
  }

  getTransactions() {
    try {
      this.transactionService.getTransactionsList(Number(this.accountId)).subscribe(transactions => {
        if (transactions.empty) {
          this.isEmpty = true;
        }

        this.loading = false;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
