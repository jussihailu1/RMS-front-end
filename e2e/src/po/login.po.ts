import { browser, by, element } from 'protractor';

export class LoginPage {

    getLoginPageTitleText() {
        return element(by.css('h2')).getText() as Promise<string>;
    }
    
    getLoginInput() {
        return element(by.css('.login-input'));
    }

    getReservationsLoginButton() {
        return element(by.buttonText('Reservations'));
    }
}