import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexTheme, ChartComponent } from 'ng-apexcharts';
import { AnnualReportsMonth } from 'src/app/core/models/ChartsModels';
import { ChartsService } from 'src/app/core/service/charts/shared/charts.service';
import { dataOption } from 'src/utils/charts';
import { monthsName } from 'src/utils/months';
import { COLOR_PALLETE } from '../charts.component';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-chartsdonut',
  templateUrl: './chartsdonut.component.html',
  styleUrls: ['./chartsdonut.component.scss']
})
export class ChartsdonutComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>

  data: AnnualReportsMonth[] = [];


  constructor(
    private chartService: ChartsService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  fillDataOption(): dataOption[] {
    let serie: dataOption[] = [];
    this.data.forEach(month => {

      serie.push({
        x: monthsName[month.month],
        y: month.expenses,
        goals: [
          {
            name: 'Receitas',
            value: month.incomes,
            strokeHeight: 5,
            strokeColor: '#0d0'
          }
        ]
      })
    });

    return serie;
  }

  getData(): void {
    this.chartService.getAnnualReports().subscribe(data => {
      this.data = data;


      this.chartOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
          type: "donut",
          foreColor: '#fff'
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })
  }

}
