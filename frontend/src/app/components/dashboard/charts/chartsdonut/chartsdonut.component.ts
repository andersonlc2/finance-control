import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexDataLabels, ChartComponent } from 'ng-apexcharts';
import { TotalExpenses } from 'src/app/core/models/ChartsModels';
import { ChartsService } from 'src/app/core/service/charts/shared/charts.service';


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
  dataLabels: ApexDataLabels
};

@Component({
  selector: 'app-chartsdonut',
  templateUrl: './chartsdonut.component.html',
  styleUrls: ['./chartsdonut.component.scss']
})
export class ChartsdonutComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>

  data: TotalExpenses[] = [];

  constructor(
    private chartService: ChartsService,
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getLabels(): string[] {
    let result: string[] = [];

    let max = this.data.length < 5 ? this.data.length : 5;
    if (this.data.length > 0) {
      for (let index = 0; index < max; index++) {
        result.push(this.data[index].type);
      }
    }

    return result;
  }

  getValues(data: TotalExpenses[]): number[] {
    let result: number[] = [];

    let max = data.length < 5 ? data.length : 5;
    if (data.length > 0) {
      for (let index = 0; index < max; index++) {
        result.push(Number(data[index].value.toFixed(2)));
      }

    }

    return result;
  }

  getData(): void {
    this.chartService.getTotalExpenses().subscribe(data => {
      this.data = data;

      this.chartOptions = {
        series: this.getValues(data),
        chart: {
          type: "donut",
          foreColor: '#fff',
          offsetY: 20,
          width: '100%',
          height: 330
        },
        labels: this.getLabels(),
        responsive: [
          {
            breakpoint: 570,
            options: {
              chart: {
                width: '100%'
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        dataLabels: {
          enabled: false,
        },
      };
    })
  }

}
