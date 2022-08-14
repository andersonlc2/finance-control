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
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
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

  fillDataIncomes(): number[] {
    let serie: number[] = [];
    this.data.forEach(month => {

      serie.push(month.incomes);
    })

    return serie;
  }

  fillDataExpenses(): number[] {
    let serie: number[] = [];
    this.data.forEach(month => {

      serie.push(month.expenses);
    });

    return serie;
  }

  fillDataMonths(): String[] {
    let serie: String[] = [];
    this.data.forEach(month => {

      serie.push(monthsName[month.month]);
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
            data: this.fillDataExpenses(),
            color: '#f36'
          },
          {
            name: "Receitas",
            data: this.fillDataIncomes()
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          foreColor: '#fff'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: "72%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: this.fillDataMonths()
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "R$ " + val.toFixed(2);
            }
          }
        }
      }
    })
  }
}

