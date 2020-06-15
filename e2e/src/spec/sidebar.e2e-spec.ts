import { Helper } from './../helper';
import { browser, logging } from "protractor";


describe('sidebar tests', () => {
    let helper: Helper;

    beforeEach(() => {
        helper = new Helper();
        helper.loginToReservations();
    })

    it('should display sidebar title', () => {
        expect(helper.sidebarPage.getSideBarTitleText()).toEqual(helper.sidebarPage.TITLE);
    })

    it('should go to "Reservations" page', () => {
        helper.loginToTables();
        helper.sidebarPage.getReservationsButton().click();
        expect(helper.reservationsPage.getReservationsPageTitleText()).toEqual(helper.reservationsPage.TITLE);
    })

    it('should go to "Tables" page', () => {
        helper.loginToReservations();
        helper.sidebarPage.getTablesButton().click();
        expect(helper.tablesPage.getTablesPageTitleText()).toEqual(helper.tablesPage.TITLE);
    })

    it('should logout', () => {
        helper.sidebarPage.getLogoutButton().click();
        expect(helper.loginPage.getLoginPageTitleText()).toEqual(helper.loginPage.TITLE);
    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    })
})