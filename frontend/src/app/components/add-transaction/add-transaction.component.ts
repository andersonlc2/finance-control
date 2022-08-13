import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    value: 0.00,
    status: "",
    afterBalance: 0
  };
  accountId: number;
  types: Type[] = [];

  error: string = "";

  constructor(
    private route: ActivatedRoute,
    private routeLink: Router,
    private transactionService: TransactionService,
    private toastr: ToastrService
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
    this.error = "";

    if (this.transaction.debitOrCredit == "0" || this.transaction.type?.id! <= 0 || this.transaction.value! <= 0.0) {
      this.error = "Os campos com (*) asterisco são obrigatórios."
    }

    if (this.error === "") {
      this.transactionService.save(this.accountId, this.transaction).subscribe(Transaction => {

        this.routeLink.navigateByUrl('main-list', { skipLocationChange: true }).then(() => {
          this.routeLink.navigate([`transaction/${this.accountId}`]);
        });

        this.showSuccess();
      },
        err => {

          console.log(err);
        }
      );

      this.error = "";

      this.routeLink.navigate([`transaction/${this.accountId}`]);
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

  showSuccess(): void {
    this.toastr.success('Transação salva', '');
  }
}
