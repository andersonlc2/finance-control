import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/core/models/Transaction';
import { TransactionService } from 'src/app/core/service/transaction/shared/transaction.service';
import { MonthOfYear, months } from 'src/utils/months';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[] = [];

  months: Array<MonthOfYear> = [];
  years: Array<number> = [];

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.listTransactions();
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

      if (index === 0) {
        listYears[cont] = actualYear;
      }
      cont++;
    }

    return listYears;
  }

  getDateString(date: string): string {
    return new Date(date!).toLocaleDateString()
  }

  listTransactions() {
    const transactionId = Number(this.route.snapshot.paramMap.get("id"));
    this.transactionService.getAllTransactions(transactionId).subscribe(transactions => {
      this.transactions = transactions.content;
    });
  }

}
