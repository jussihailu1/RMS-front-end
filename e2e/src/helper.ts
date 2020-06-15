import { TablesPage } from './po/tables.po';
import { Navigate } from './navigate';
import { OnInit } from '@angular/core';
import { ReservationsPage } from './po/reservations.po';
import { LoginPage } from './po/login.po';
import { SidebarPage } from './po/sidebar.po';


export class Helper{
    public navigate: Navigate;
    public loginPage: LoginPage;
    public reservationsPage: ReservationsPage;
    public tablesPage: TablesPage;
    public sidebarPage: SidebarPage;

    constructor() {
        this.navigate = new Navigate();
        this.loginPage = new LoginPage();
        this.reservationsPage = new ReservationsPage();
        this.tablesPage = new TablesPage();
        this.sidebarPage = new SidebarPage();
    }

    loginToReservations(){
        this.navigate.toBaseUrl();
        this.loginPage.getLoginInput().sendKeys('1111');
        this.loginPage.getReservationsLoginButton().click();
    }

    loginToTables(){
        this.navigate.toBaseUrl();
        this.loginPage.getLoginInput().sendKeys('1111');
        this.loginPage.getTablesLoginButton().click();
    }
}