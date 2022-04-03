import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
})
export class GraphicsComponent {
  public productData: ChartData<'doughnut'> = {
    labels: ['Pan', 'Refresco', 'Tacos'],
    datasets: [{ data: [100, 350, 200] }],
  };
}
