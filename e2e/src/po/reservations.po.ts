import { browser, by, element } from 'protractor';

export class ReservationsPage {
    public TITLE = "Reservations";

    getReservationsPageTitleText() {
        return element(by.css('h2')).getText();
    }

    getNewReservationButton(){
        return element(by.buttonText('New'));
    }

    getSaveNewReservationButton(){
        return element(by.id('save-btn'));
    }
}