import { browser, } from 'protractor';

export class Navigate{
    toBaseUrl(): Promise<unknown> {
      return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    toReservationsPage(){
        const url = browser.baseUrl + "/reservations";
        return browser.get(url);
    }
}