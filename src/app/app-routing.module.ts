import { ReservationsComponent } from './reservations/reservations.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables/tables.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'tables', component: TablesComponent },
  { path: '**', redirectTo: '' } //Deze moet als laatst!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }                 // <-- debugging purposes only
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }