import { Component, OnInit } from "@angular/core";


export const COLOR_PALLETE = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0']

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }
}

