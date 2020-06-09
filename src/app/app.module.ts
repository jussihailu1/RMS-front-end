import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LinkComponent } from './sidebar/link/link.component';
import { TablesComponent } from './tables/tables.component';
import { ReservationsCalendarComponent } from './reservations/reservations-calendar/reservations-calendar.component';
import { TodayComponent } from './reservations/today/today.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { EditReservationComponent } from './reservations/edit-reservation/edit-reservation.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { TablesListComponent } from './tables/tables-list/tables-list.component';
import { EditTableComponent } from './tables/edit-table/edit-table.component';
import { AddSessionComponent } from './tables/add-session/add-session.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReservationsComponent,
    SidebarComponent,
    LinkComponent,
    TablesComponent,
    ReservationsCalendarComponent,
    TodayComponent,
    AddReservationComponent,
    EditReservationComponent,
    LoadingScreenComponent,
    TablesListComponent,
    EditTableComponent,
    AddSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
