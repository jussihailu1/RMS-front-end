import { Helper } from './../helper';
import { Navigate } from './../navigate';
import { AppPage } from '../po/app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from '../po/login.po';
import { ReservationsPage } from '../po/reservations.po';
import { TablesPage } from '../po/tables.po';

describe('login tests', () => {
  let helper: Helper;

  beforeEach(() => {
    helper = new Helper();
    helper.navigate.toBaseUrl();
  });

  it('should display login page', () => {
    expect(helper.loginPage.getLoginPageTitleText()).toEqual(helper.loginPage.TITLE);
  });

  it('should login to reservations', () => {
    helper.loginPage.getLoginInput().sendKeys('1111');
    helper.loginPage.getReservationsLoginButton().click();
    expect(helper.reservationsPage.getReservationsPageTitleText()).toEqual(helper.reservationsPage.TITLE);
  })

  it('should login to tables', () => {
    helper.loginPage.getLoginInput().sendKeys('1111');
    helper.loginPage.getTablesLoginButton().click();
    browser.debugger();
    expect(helper.tablesPage.getTablesPageTitleText()).toEqual(helper.tablesPage.TITLE);
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
})