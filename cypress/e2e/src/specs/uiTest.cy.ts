import {helper} from "../page-objects/helper";
/// <reference types="cypress-xpath" />
describe("Verify UI tests", { testIsolation: false }, () => {
    it("Write tests in Cypress which will select correct MCI (Master Cost Item)", () => {
        cy.visit(Cypress.env("url"));
        //From 'Search MCI' Component, select ONLY 'Agency Fee' from the list
        helper.selectValueInMciDropdown('Agency Fee');
    });

    it("Write tests in Cypress which will select any Annotation from the list (see Annotations list)", () => {
        //From 'Search Annotations' Component, select any Annotation from the list
        helper.selectValueInAnnotationDropdown('Internal');
        helper.addRecord("Agency Fee","Internal", "222");

        //add 'Agency Fee' MCI with all annotations available
        helper.addRecord("Agency Fee", "Transportation", "222");
        helper.addRecord("Agency Fee","Internal", "222");
        helper.addRecord("Agency Fee","External", "222");
    });

    it("Write tests in Cypress which will add value", () => {
        helper.addRecord("Agency Fee","Drydock", "222");
    });

    it("Write tests in Cypress which will check Total", () => {
        //Check whether all items contains correct values in USD currency
        cy.xpath('//*[@id="search-component"]//td[3]/div[2]').each(($elm)=>{
            cy.wrap($elm).should('have.text', 'USD: 2.76');
        });
    });

    it("Verify total value in USD with 1 cent of adjustment", () => {
        helper.totalUsdValue().then((value)=>{
            expect(value).to.be.closeTo(13.79, 0.1);
        });
    });
});
