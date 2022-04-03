import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
})
export class DonutsComponent {
  @Input() title: string = 'Sin Título';
  @Input('labels') doughnutChartLabels: string[] = [
    'Label1',
    'Label2',
    'Label2',
  ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        // backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#cc65fe'],
      },
    ],
  };
}
