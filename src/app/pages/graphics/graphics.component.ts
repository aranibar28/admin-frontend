import { Component } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
})
export class GraphicsComponent {
  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data1 = [[10, 15, 40]];
}
