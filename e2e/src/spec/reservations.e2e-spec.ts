import { Functions } from './../functions';
import { Navigate } from './../navigate';
import { AppPage } from '../po/app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from '../po/login.po';
import { ReservationsPage } from '../po/reservations.po';

describe('reservations tests', () => {
    let functions: Functions;
    let navigate: Navigate;
    let reservationsPage: ReservationsPage;
    let loginPage: LoginPage;

    beforeEach(() => {
        functions = new Functions();
        navigate = new Navigate();
        reservationsPage = new ReservationsPage();
        loginPage = new LoginPage();
    })

    // it('should display reservations page title', () => {
    //     // HIER BEZIG: MAKE THIS WORK!!!
    //     loginPage.getLoginInput().sendKeys('1111');
    //     loginPage.getReservationsLoginButton().click();
    //     // functions.login();
    //     // navigate.toReservationsPage();
    //     expect(reservationsPage.getReservationsPageTitleText()).toEqual("Reservations");
    // })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    })
})