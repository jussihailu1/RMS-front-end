import { Observable } from 'rxjs';
import { Reservation } from './../_models/reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private endpointUrl = "http://localhost:8087/reservations/";
  private todaysReservationsUrl = this.endpointUrl + "today";
  private todaysNotvisitedReservationsUrl = this.todaysReservationsUrl + "/notvisited";

  private findReservationsOfNextNDaysUrl(daySpan: number): string {
    return this.endpointUrl + "nextNDays?daySpan=" + daySpan;
  }

  private options = {
    headers: {
      "Authorization": localStorage.getItem("jwt")
    }
  }

  constructor(private http: HttpClient) { }

  findReservationById(id: number): Observable<Reservation> {
    const url = this.endpointUrl + id;
    return this.http.get<Reservation>(url, this.options);
  }

  findTodaysReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.todaysReservationsUrl, this.options);
  }

  findTodaysNotVisitedReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.todaysNotvisitedReservationsUrl, this.options);
  }

  findReservationsOfNextNDays(daySpan: number): Observable<Reservation[]> {
    const url = this.findReservationsOfNextNDaysUrl(daySpan);
    return this.http.get<Reservation[]>(url, this.options);
  }

  saveReservation(reservation: Reservation): Observable<any> {
    const options = {
      headers: {
        "Authorization": localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({
      customers: reservation.getCustomers(),
      date: reservation.getDate().toISOString().substring(0, 10),
      time: reservation.getDate().toLocaleTimeString("nl"),
      name: reservation.getName()
    });

    return this.http.post<any>(this.endpointUrl, body, options);
  }

  editReservation(reservation: Reservation): Observable<any> {
    const options = {
      headers: {
        "Authorization": localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({
      id: reservation.getId(),
      customers: reservation.getCustomers(),
      date: reservation.getDate().toISOString().substring(0, 10),
      time: reservation.getDate().toLocaleTimeString("nl"),
      name: reservation.getName()
    });
    const url = this.endpointUrl + reservation.getId();
    return this.http.put<any>(url, body, options);
  }

  cancelReservation(id: number) {
    const options = {
      headers: {
        "Authorization": localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      }
    }
    const url = this.endpointUrl + id;
    return this.http.delete<any>(url, options);
  }

  toggleVisited(id: number): Observable<any> {
    const url = this.endpointUrl + id + "/toggleVisited";
    console.log(url);
    console.log(localStorage.getItem("jwt"));
    return this.http.put<any>(url, this.options);
  }
}
