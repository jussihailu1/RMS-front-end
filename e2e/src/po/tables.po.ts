import { browser, by, element } from 'protractor';

export class TablesPage {
    public TITLE = "Tables";

    getTablesPageTitleText() {
        return element(by.css('h2')).getText();
    }

    getNewSessionButton(){
        return element(by.buttonText('New'));
    }

    getSaveNewSessionButton(){
        return element(by.buttonText('Save'));
    }
}