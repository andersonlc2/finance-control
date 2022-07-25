import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/service/account/shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = 'Usuário';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.name = this.accountService.getUserName();
  }

  onClick() {
    this.accountService.logout();
  }
}
