import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/Transaction';
import { AccountService } from 'src/app/core/service/account/shared/account.service';
import { TransactionService } from 'src/app/core/service/transaction/shared/transaction.service';
import { MonthOfYear, months } from 'src/utils/months';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[] = [];

  months: Array<MonthOfYear> = [];
  years: Array<number> = [];
  params = {
    "actualMonth": new Date().getMonth(),
    "actualYear": new Date().getFullYear()
  }
  balanceOfMonth: number = 0;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private routeLink: Router,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.listTransactions(this.params.actualMonth, this.params.actualYear);
    this.months = months;
    this.years = this.getYears();
  }

  isActualMonth(month: number): boolean {
    let actualDate = new Date();

    return actualDate.getMonth() == month;
  }

  getYears(): number[] {
    let actualYear: number = new Date().getFullYear();
    let listYears: number[] = [];
    let cont: number = 0;
    for (let index = 4; index >= 0; index--) {
      listYears[cont] = actualYear - index;
      if (index === 1) {
        listYears[cont] = actualYear;
      }
      if (index === 0) {
        listYears[cont] = actualYear + 1;
      }
      cont++;
    }

    return listYears;
  }

  getDateString(date: string): string {
    return new Date(date!).toLocaleDateString()
  }


  onChangeMonth(deviceValue: string) {
    this.listTransactions(this.params.actualMonth, this.params.actualYear);

    console.log(deviceValue);
  }

  onChangeYear(deviceValue: string) {
    this.listTransactions(this.params.actualMonth, this.params.actualYear);

    console.log(deviceValue);
  }

  listTransactions(month: number, year: number) {
    if (this.accountService.isUserLoggedIn()) {
      try {
        const transactionId = Number(this.route.snapshot.paramMap.get("id"));

        this.transactionService.getAllTransactions(
          transactionId, year, month).subscribe(transactions => {
            this.transactions = transactions.content;

            this.setBalanceOfMonth();

          });

      } catch (err) {
        console.error(err);
      }
    } else {
      this.routeLink.navigate(['login']);
    }
  }

  setBalanceOfMonth() {
    let lastIndex = this.transactions.length - 1;
    if (this.transactions[lastIndex].afterBalance) {
      this.balanceOfMonth = this.transactions[lastIndex].afterBalance!;
    }
  }

}
