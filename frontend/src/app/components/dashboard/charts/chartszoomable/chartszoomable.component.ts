import { Component, OnInit, ViewChild } from '@angular/core';
import { MonthBalance } from 'src/app/core/models/Balances';
import { ChartsService } from 'src/app/core/service/charts/shared/charts.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexXAxis,
  ApexTooltip,
  ChartComponent,
  ApexStroke,
  ApexYAxis
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-chartszoomable',
  templateUrl: './chartszoomable.component.html',
  styleUrls: ['./chartszoomable.component.scss']
})
export class ChartszoomableComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>

  balances: MonthBalance[] = [];

  constructor(
    private chartsService: ChartsService
  ) {
    this.initChartData();
  }

  ngOnInit(): void {
  }

  fillDataMonths(): string[] {
    let serie: string[] = [];
    this.balances.forEach(month => {

      if (month.period.endsWith("2022")) {
        serie.push(month.period);
      }
    });

    return serie;
  }

  fillDataBalances(): number[] {
    let serie: number[] = [];
    this.balances.forEach(month => {

      if (month.period.endsWith("2022")) {
        serie.push(month.balance);
      }
    });

    return serie;
  }

  initChartData(): void {
    this.chartsService.getAllBalances().subscribe(balances => {
      this.balances = balances;

      this.chartOptions = {
        series: [
          {
            name: "Saldo",
            data: this.fillDataBalances()
          }
        ],
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          foreColor: '#fff',
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: false
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth",
          show: true,
          width: 2,
        },
        xaxis: {
          categories: this.fillDataMonths(),
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return Number(val).toFixed(2);
            }
          }
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "R$ " + val.toFixed(2);
            }
          }
        }
      };

    })

  }

}
