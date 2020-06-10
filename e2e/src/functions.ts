import { Navigate } from './navigate';
import { OnInit } from '@angular/core';
import { ReservationsPage } from './po/reservations.po';
import { LoginPage } from './po/login.po';


export class Functions{
    private navigate: Navigate;
    private loginPage: LoginPage;
    private reservationsPage: ReservationsPage;

    constructor() {
        this.navigate = new Navigate();
        this.loginPage = new LoginPage();
        this.reservationsPage = new ReservationsPage();
    }

    login(){
        this.navigate.toBaseUrl();
        this.loginPage.getLoginInput().sendKeys('1111');
        this.loginPage.getReservationsLoginButton().click();
        expect(this.reservationsPage.getReservationsPageTitleText()).toEqual('Reservations');
    }
}