import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AnnualReportsMonth } from 'src/app/core/models/ChartsModels';
import { ChartsService } from 'src/app/core/service/charts/shared/charts.service';
import { dataOption } from 'src/utils/charts';
import { monthsName } from 'src/utils/months';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};


@Component({
  selector: 'app-chartsbar',
  templateUrl: './chartsbar.component.html',
  styleUrls: ['./chartsbar.component.scss']
})
export class ChartsbarComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  accountId: number;
  expenses: number[];
  incomes: number[];

  data: AnnualReportsMonth[] = [];

  constructor(
    private chartService: ChartsService,
  ) {
    this.getData();
  }

  ngOnInit(): void {

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
        series: [
          {
            name: "Despesas",
            data: this.fillDataOption()
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          foreColor: '#fff'
        },
        title: {
          text: "",
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ddd'
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#fff'
            }
          }
        },
        fill: {
          colors: ['#f36']
        }
      }
    })
  }
}
