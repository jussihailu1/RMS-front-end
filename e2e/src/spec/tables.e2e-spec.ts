import { browser, logging } from "protractor";
import { Helper } from '../helper';

describe('tables tests', () => {
    let helper: Helper;

    beforeEach(() => {
        helper = new Helper();
        helper.loginToTables();
    })

    it('should display tables page title', () => {
        expect(helper.tablesPage.getTablesPageTitleText()).toEqual(helper.tablesPage.TITLE);
    })

    it('should display "new" button to add new session', () => {
        expect(helper.tablesPage.getNewSessionButton().getText()).toEqual('New');
    })

    it('should display "save" button to save new session', () => {
        helper.reservationsPage.getNewReservationButton().click();
        expect(helper.tablesPage.getSaveNewSessionButton().getText()).toEqual('Save');
    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    })
})