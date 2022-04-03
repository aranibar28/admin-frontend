import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonutsComponent } from './donuts/donuts.component';

@NgModule({
  declarations: [IncrementerComponent, DonutsComponent],
  exports: [IncrementerComponent, DonutsComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
})
export class ComponentsModule {}
