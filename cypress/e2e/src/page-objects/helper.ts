export const helper = {
    //helper function to get UTC date and remove seconds. Removed seconds because seconds kept on changing and assertions were failing.
    getUtcDate() {
        let dateToMatch;
        let d1 = new Date();
        let d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getHours(), d1.getMinutes());
        dateToMatch = d2.toUTCString();
        //truncating string from end to remove seconds because seconds always differs while equating
        dateToMatch = dateToMatch.substring(0, dateToMatch.length-6);
        return dateToMatch;
    },

    //helper function to select value in MCI dropdown
    selectValueInMciDropdown(mciValueToSelect) {
        cy.get("#search-box-mcis").should('be.visible').clear().type(mciValueToSelect);
        cy.xpath("//a[text() = ' "+mciValueToSelect+" ']").click();
    },

    //helper function to select value in annotation dropdown
    selectValueInAnnotationDropdown(annotaionValueToSelect) {
        cy.get("#search-box-annotations").should('be.visible').clear().type(annotaionValueToSelect);
        cy.xpath("//a[text() = ' "+annotaionValueToSelect+" ']").click();
    },

    //helper function to enter value in cost field
    enterValueInCostField(costValue) {
        cy.get('#master-cost-input').should('be.visible').clear().type(costValue);
    },

    //helper function to click on add button
    clickOnAddButton() {
        cy.xpath('//*[text()=" Add "]').should('be.enabled').click();
    },

    //helper function to add record
    addRecord(mciValueToSelect, annotaionValueToSelect, costValue) {
        this.selectValueInMciDropdown(mciValueToSelect);
        this.selectValueInAnnotationDropdown(annotaionValueToSelect);
        this.enterValueInCostField(costValue);
        //verify the exchange rate field value is 80.53999999999999 against 1USD
        cy.get("#master-cost-usd-rate").should('have.value', '80.53999999999999');
        this.clickOnAddButton();
    },

    //helper method to check 1 cent adjustment if required
    totalUsdValue(){
        return cy.xpath('//*[@id="search-component"]//td[3]/div[2]').then((elm)=>{
            return elm.length*2.76;
        })
    },
}