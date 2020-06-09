import { Component, OnInit, } from '@angular/core';
import { LoginService } from '../_services/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loading = false;
  invalid = false;
  loginFailed = false;

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    // this.router.navigate(["reservations"]);

    // if(localStorage.getItem("loggedOut") == undefined){
    //   let loginCode = localStorage.getItem("loginCode");
    //   if (loginCode != null) {
    //     console.log("Login code found in local storage: " + loginCode + ". Logging in...");
    //     this.login(loginCode);
    //   }
    // }
    this.tables("1111");  
  }

  // onKeyPress(event, loginCode: string) {
  //   if (event.key == "Enter") {
  //     this.login(loginCode);
  //   }
  // }

  reservations(loginCode: string){
    const navigationUrl = "reservations";
    this.login(loginCode, navigationUrl); 
  }

  tables(loginCode: string){
    const navigationUrl = "tables";
    this.login(loginCode, navigationUrl); 
  }

  private login(loginCode: string, navigationUrl: string) {
    this.loading = true;
    if (loginCode.length != 4) {
      this.invalid = true;
    } else {
      this.invalid = false;
      this.service.login(loginCode).subscribe(response => {
        if (response.message == "WRONG_CREDENTIALS") {
          this.loginFailed = true;
        } else {
          this.service.confirmLogin(loginCode, response.jwt);
          this.loading = false;
          this.loginFailed = false;
          this.router.navigate([navigationUrl]);
        }
      }, error => console.log(error))
    }
    this.loading = false;
  }

}
