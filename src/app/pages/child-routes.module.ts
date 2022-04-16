import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Maintenances
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicComponent } from './maintenance/medics/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: 'graphics', component: GraphicsComponent, data: { title: 'Gráficas' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  
  // Settings
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil' } },
  { path: 'settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Búsquedas' } },

  // Maintenances
  { path: 'hospitales', component: HospitalsComponent, data: { title: 'Hospitales' } },
  { path: 'medicos', component: MedicsComponent, data: { title: 'Médicos' } },
  { path: 'medicos/:id', component: MedicComponent, data: { title: 'Médicos' } },

  // Rutas Admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Usuarios' } },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }
