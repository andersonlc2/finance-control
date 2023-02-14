import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction, Type } from 'src/app/core/models/Transaction';
import { TransactionService } from 'src/app/core/service/transaction/shared/transaction.service';

import { ToastrService } from 'ngx-toastr';

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

  error: string = "";


  constructor(
    private route: ActivatedRoute,
    private routeLink: Router,
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) {
    this.accountId = Number(this.route.snapshot.paramMap.get("accountId"));
    this.transactionId = Number(this.route.snapshot.paramMap.get("transactionId"));
  }

  ngOnInit(): void {
    this.findTransaction();
    this.setTypes();
  }

  onSubmit() {
    this.updTransaction();
  }

  updTransaction(): void {
    this.error = "";

    if (this.transaction.debitOrCredit == "0" || this.transaction.type?.id! <= 0 || this.transaction.value! <= 0.0) {
      this.error = "Os campos com (*) asterisco são obrigatórios."
    }

    if (this.error === "") {
      this.transaction = this.transactionService.update(this.accountId, this.transaction);
      this.showSuccess();
      
      this.routeLink.navigate([`transaction/${this.accountId}/${new Date(this.transaction.dueDate!).getMonth()}/${new Date(this.transaction.dueDate!).getFullYear()}`]);
      
      this.error = "";
    }

  }

  findTransaction(): void {
    this.transactionService.getTransactionById(this.accountId, this.transactionId).subscribe(t => {

      let prov = t;
      prov.dueDate = this.getDateString(t.dueDate!);

      this.transaction = prov;

      if (this.transaction.debitOrCredit == "D") {
        this.transaction.debitOrCredit = "1";
      } else {
        this.transaction.debitOrCredit = "2";
      }
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
    this.routeLink.navigate([`transaction/${this.accountId}/${new Date(this.transaction.dueDate!).getMonth()}/${new Date(this.transaction.dueDate!).getFullYear()}`]);
  }

  deleteClick(): void {
    this.transactionService.delete(this.accountId, this.transactionId);
    
    this.showError();

    this.routeLink.navigateByUrl('main-list', { skipLocationChange: true }).then(() => {
      this.routeLink.navigate([`transaction/${this.accountId}/${new Date(this.transaction.dueDate!).getMonth()}/${new Date(this.transaction.dueDate!).getFullYear()}`]);
    });
  }

  showSuccess() {
    this.toastr.success('Transação salva!', '');
  }

  showError() {
    this.toastr.error('Transação excluída', '')
  }

}
