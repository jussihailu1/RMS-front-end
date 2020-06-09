import { HttpClient } from '@angular/common/http';
import { Session } from './../_models/session';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private endPoint = "http://localhost:8087/sessions/"
  private findTodaysSessionsUrl = this.endPoint + "today";
  private findAvailableTablesUrl = "http://localhost:8087/tables/available";

  private options = {
    headers: {
      "Authorization": localStorage.getItem("jwt")
    }
  }

  constructor(private http: HttpClient) { }

  findTodaysSessions(): Observable<any> {
    return this.http.get<any>(this.findTodaysSessionsUrl, this.options);
  }

  findAvailableTables(): Observable<any> {
    return this.http.get(this.findAvailableTablesUrl, this.options);
  }

  endSession(id: number) {
    const url = this.endPoint + id + "/end";
    const body = id;
    return this.http.put(url, body, this.options);
  }

  saveSession(customers: number, table: number, reservationId: number): Observable<any> {
    const body = {
      customers: customers,
      tableNumber: table,
      reservationId: reservationId
    }
    return this.http.post(this.endPoint, body, this.options);
  }
}
