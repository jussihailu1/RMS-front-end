import { Helper } from '../helper';
import { browser, logging } from 'protractor';

describe('reservations tests', () => {
    let helper: Helper;

    beforeEach(() => {
        helper = new Helper();
        helper.loginToReservations();
    })

    it('should display reservations page title', () => {
        expect(helper.reservationsPage.getReservationsPageTitleText()).toEqual(helper.reservationsPage.TITLE);
    })

    it('should display "new" button to add new reservation', () => {
        expect(helper.reservationsPage.getNewReservationButton().getText()).toEqual('New');
    })

    it('should display "save" button to save new reservation', () => {
        helper.reservationsPage.getNewReservationButton().click();
        expect(helper.reservationsPage.getSaveNewReservationButton().getText()).toEqual('Save');
    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    })
})