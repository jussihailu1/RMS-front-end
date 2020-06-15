import { LoginService } from './../_services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  linkNames = [
    "Reservations",
    "Tables"
  ]

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void { }

  logout() {
    localStorage.setItem("loggedOut", "true");
    this.loginService.logout();

    this.router.navigate(["login"]);
  }
}
