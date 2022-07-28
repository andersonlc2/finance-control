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

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.listTransactions();
    this.months = months;
  }

  isActualMonth(month: number): boolean {
    let actualDate = new Date();

    return actualDate.getMonth() == month;
  }

  listTransactions() {
    const transactionId = Number(this.route.snapshot.paramMap.get("id"));
    this.transactionService.getAllTransactions(transactionId).subscribe(transactions => {
      this.transactions = transactions;

      console.log(this.transactions);
    });
  }

}
