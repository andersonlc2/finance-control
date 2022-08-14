import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Balances } from 'src/app/core/models/Balances';
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
  loading: boolean = false;
  transactions: Transaction[] = [];
  accountId: number;

  months: Array<MonthOfYear> = [];
  years: Array<number> = [];
  params = {
    "actualMonth": new Date().getMonth(),
    "actualYear": new Date().getFullYear()
  }
  balances: Balances = {}

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private routeLink: Router,
    private accountService: AccountService

  ) {
    this.accountId = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.loading = true;
    
    this.listTransactions(this.params.actualMonth, this.params.actualYear);
    this.getBalances(this.params.actualMonth, this.params.actualYear);
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
      listYears[cont] = (actualYear + 1) - index;
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
    let dateUtc = new Date(date!);
    dateUtc.setHours(dateUtc.getHours() + 3);

    return dateUtc.toLocaleDateString();
  }


  onChangeMonth(deviceValue: string) {
    this.listTransactions(this.params.actualMonth, this.params.actualYear);
    this.getBalances(this.params.actualMonth, this.params.actualYear);
  }

  onChangeYear(deviceValue: string) {
    this.listTransactions(this.params.actualMonth, this.params.actualYear);
    this.getBalances(this.params.actualMonth, this.params.actualYear);
  }

  listTransactions(month: number, year: number) {
    if (this.accountService.isUserLoggedIn()) {
      try {
        this.transactionService.getAllTransactions(
          this.accountId, year, month).subscribe(transactions => {
            this.transactions = transactions.content;
            this.loading = false;
          });

      } catch (err) {
        console.error(err);
      }
    } else {
      this.routeLink.navigate(['login']);
    }
  }

  getBalances(month: number, year: number) {
    if (this.accountService.isUserLoggedIn()) {
      try {
        this.transactionService.getBalances(
          this.accountId, year, month).subscribe(balances => {
            if (!balances.balanceMonth) {
              this.balances.balanceMonth = 0;
            }
            this.balances = balances;

          });
      } catch (err) {
        console.error(err);
      }
    } else {
      this.routeLink.navigate(['login']);
    }
  }

}
