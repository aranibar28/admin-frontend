import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
})
export class DonutsComponent {
  @Input() title: string = 'Sin Título';
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: ['label1', 'label2', 'label3'],
    datasets: [{ data: [350, 450, 100] }],
  };
}
