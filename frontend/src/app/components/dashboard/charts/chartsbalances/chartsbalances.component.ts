import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { AnnualReportsMonth } from 'src/app/core/models/ChartsModels';
import { ChartsService } from 'src/app/core/service/charts/shared/charts.service';
import { monthsName } from 'src/utils/months';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexFill
} from "ng-apexcharts";
import { style } from '@angular/animations';

export type ChartOptions = {
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  series: ApexAxisChartSeries;
  labels: string[];
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  subtitle: ApexTitleSubtitle;
  title: ApexTitleSubtitle;
  colors: string[]
};



@Component({
  selector: 'app-chartsbalances',
  templateUrl: './chartsbalances.component.html',
  styleUrls: ['./chartsbalances.component.scss']
})
export class ChartsbalancesComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  data: AnnualReportsMonth[] = [];

  totalIncome: number = 0;
  totalExpenses: number = 0;

  @Input() tipo: string;

  constructor(
    private chartService: ChartsService
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  fillDataIncomes(): number[] {
    let serie: number[] = [];
    this.data.forEach(month => {

      serie.push(month.incomes);
      this.totalIncome += month.incomes;
    })

    return serie;
  }

  fillDataExpenses(): number[] {
    let serie: number[] = [];
    this.data.forEach(month => {

      serie.push(month.expenses);
      this.totalExpenses += month.expenses;
    });

    return serie;
  }

  fillDataMonths(): string[] {
    let serie: string[] = [];
    this.data.forEach(month => {

      serie.push(monthsName[month.month]);
    });

    return serie;
  }

  getData(): void {
    this.chartService.getAnnualReports().subscribe(data => {
      this.data = data;

      this.chartOptions = {
        chart: {
          type: 'area',
          height: 122,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: "straight"
        },
        fill: {
          opacity: 1,
          colors: this.tipo === 'inc' ? ["#0f0"] : ["#f00"]
        },
        colors: this.tipo === 'inc' ? ["#0f0"] : ["#f00"],
        series: [
          {
            name: this.tipo === "inc" ? 'Receita' : 'Despesa',
            data: this.tipo === "inc" ? this.fillDataIncomes() : this.fillDataExpenses()
          }
        ],
        labels: this.fillDataMonths(),
        yaxis: {
          min: 0,
          labels: {
            formatter: function (val) {
              return Number(val).toFixed(2);
            }
          }
        },
        xaxis: {
          categories: this.fillDataMonths()
        },
        title: {
          text: `R$ ${this.tipo === 'inc' ? this.totalIncome.toFixed(2) : this.totalExpenses.toFixed(2)}`,
          align: 'center',
          margin: 15,
          style: {
            fontSize: '28px',
            color: '#fff'
          }
        },
        subtitle: {
          text: this.tipo === "inc" ? 'Receitas' : 'Despesas',
          align: 'center',
          margin: 15,
          style: {
            fontSize: '14px',
            color: '#ddd'
          }
        }
      };
    })
  }

}
