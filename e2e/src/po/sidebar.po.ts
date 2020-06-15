import { element, by } from 'protractor';
export class SidebarPage{
    public TITLE = "RMS";

    getSideBarTitleText(){
        return element(by.css('h1')).getText();
    }

    getReservationsButton(){
        return element(by.cssContainingText('p.link', 'Reservations'));
    }

    getTablesButton(){
        return element(by.cssContainingText('p.link', 'Tables'));
    }

    getLogoutButton(){
        return element(by.cssContainingText('p.link', 'Logout'));
    }
}