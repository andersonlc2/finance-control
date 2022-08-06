import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexTheme,
  ApexDataLabels
} from "ng-apexcharts";
import { monthsName } from 'src/utils/months';
import { dataOption } from 'src/utils/charts';
import { ChartsService } from 'src/app/core/service/charts/shared/charts.service';
import { AnnualReportsMonth } from 'src/app/core/models/ChartsModels';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  theme: ApexTheme;
  dataLabels: ApexDataLabels
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
      data.length

      this.chartOptions = {
        series: [
          {
            name: "Despesas",
            data: this.fillDataOption()
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Despesas por mês",
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#ddd'
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#ddd'
            }
          }
        },
        fill: {
          colors: ['#f00']
        }
      }
    })
  }
}

