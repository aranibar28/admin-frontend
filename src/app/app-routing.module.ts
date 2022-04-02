import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  // path: '/auth' AuthRoutingModule
  // path: '/dashboard' PagesRoutingModule
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
