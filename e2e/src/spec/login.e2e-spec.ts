import { Navigate } from './../navigate';
import { AppPage } from '../po/app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from '../po/login.po';
import { ReservationsPage } from '../po/reservations.po';

describe('login tests', () => {
  let navigate: Navigate
  let loginPage: LoginPage;
  let reservationsPage: ReservationsPage;

  beforeEach(() => {
    navigate = new Navigate();
    loginPage = new LoginPage();
    reservationsPage = new ReservationsPage();
    navigate.toBaseUrl();
  });

  it('should display login page', () => {
    expect(loginPage.getLoginPageTitleText()).toEqual('RMS - Login');
  });

  it('should login', () => {
    loginPage.getLoginInput().sendKeys('1111');
    loginPage.getLoginButton().click();
    expect(reservationsPage.getReservationsPageTitleText()).toEqual('Reservations');
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
})