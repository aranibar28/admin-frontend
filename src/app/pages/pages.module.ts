import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './maintenance/users/users.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicComponent } from './maintenance/medics/medic.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    PerfilComponent,
    UsersComponent,
    MedicsComponent,
    HospitalsComponent,
    MedicComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    NgxSkeletonLoaderModule,
  ],
})
export class PagesModule {}
