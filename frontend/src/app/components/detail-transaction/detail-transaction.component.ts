import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction, Type } from 'src/app/core/models/Transaction';
import { TransactionService } from 'src/app/core/service/transaction/shared/transaction.service';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.scss']
})
export class DetailTransactionComponent implements OnInit {

  transaction: Transaction = {
    id: "",
    type: {
      id: 0,
      name: ""
    },
    description: "",
    debitOrCredit: "0",
    dueDate: "",
    value: 0.00,
    status: "",
    afterBalance: 0
  };
  accountId: number;
  transactionId: number;
  types: Type[] = [];

  constructor(
    private route: ActivatedRoute,
    private routeLink: Router,
    private transactionService: TransactionService
  ) {
    this.accountId = Number(this.route.snapshot.paramMap.get("accountId"));
    this.transactionId = Number(this.route.snapshot.paramMap.get("transactionId"));
  }

  ngOnInit(): void {
    this.findTransaction();
    this.setTypes();
  }

  onSubmit() {

  }

  findTransaction(): void {
    this.transactionService.getTransactionById(this.accountId, this.transactionId).subscribe(transaction => {
      this.transaction = transaction;
      this.transaction.dueDate = this.getDateString(transaction.dueDate!);
    })

  }

  getDateString(date: string): string {
    let dateUtc = new Date(date!);
    dateUtc.setHours(dateUtc.getHours() + 3);

    return dateUtc.toISOString().substring(0, 10);
  }

  setTypes(): void {
    try {
      this.transactionService.getTypes().subscribe(types => {

        this.types = types;
      })
    } catch (err) {
      console.log(err);
    }
  }

  cancelClick(): void {
    this.routeLink.navigate([`transaction/${this.accountId}`]);
  }
}
