import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/service/account/shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.accountService.logout();
  }
}
