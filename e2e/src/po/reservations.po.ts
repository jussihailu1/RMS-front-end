import { browser, by, element } from 'protractor';

export class ReservationsPage {
    getReservationsPageTitleText() {
        return element(by.css('h2')).getText();
    }
}