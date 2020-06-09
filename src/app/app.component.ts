import { LoginService } from './_services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rms';

  public sidebarHidden: Boolean = true;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();

    this.loginService.subjectMessage$.subscribe(() => this.hideOrShowSidebar());

    if (localStorage.getItem("loggedOut") == null) {
      this.router.navigate(["login"]);
    }
  }

  private hideOrShowSidebar(): void {
    this.sidebarHidden = localStorage.getItem("loggedOut") == "true";
  }
}
