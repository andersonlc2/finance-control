import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  account = {
    "id": '',
    "accountType": '',
    "balance": 0.0,
    "limit": 0.0
  }

  constructor() { }

  ngOnInit(): void {
  }

}
