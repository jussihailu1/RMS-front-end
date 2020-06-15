import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subject = new Subject<any>();
  subjectMessage$ = this.subject.asObservable();

  private url = "http://localhost:8087/authenticate";

  constructor(private http: HttpClient) { }

  login(loginCode: string): Observable<any> {
    return this.http.post<any>(this.url, { loginCode: loginCode });
  }

  confirmLogin(loginCode: string, jwt: string) {
    jwt = "Bearer " + jwt;
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("loggedOut", "false");
    this.subject.next();
  }

  logout() {
    this.subject.next();
  }
}