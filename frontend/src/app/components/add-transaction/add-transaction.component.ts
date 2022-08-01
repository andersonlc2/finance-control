import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction, Type } from 'src/app/core/models/Transaction';
import { TransactionService } from 'src/app/core/service/transaction/shared/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  transaction: Transaction = {
    id: "",
    type: {
      id: 0,
      name: ""
    },
    description: "",
    debitOrCredit: "0",
    dueDate: "",
    value: 0,
    status: "",
    afterBalance: 0
  };
  accountId: number;
  types: Type[] = [];

  constructor(
    private route: ActivatedRoute,
    private routeLink: Router,
    private transactionService: TransactionService
  ) {
    this.accountId = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.setTypes();
  }

  onSubmit() {
    this.addTransaction();
  }

  addTransaction(): void {
    if (this.transaction.debitOrCredit == "1") {
      this.transaction.debitOrCredit = "D";
    } else {
      this.transaction.debitOrCredit = "C";
    }

    try {
      this.transaction.dueDate = new Date(this.transaction.dueDate!).toISOString();

      this.transactionService.save(this.accountId, this.transaction).subscribe(Transaction => {

        this.routeLink.navigateByUrl('main-list', { skipLocationChange: true }).then(() => {
          this.routeLink.navigate([`transaction/${this.accountId}`]);
        });

      });

      this.routeLink.navigate([`transaction/${this.accountId}`]);

    } catch (err) {
      console.error(err);
    }
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
