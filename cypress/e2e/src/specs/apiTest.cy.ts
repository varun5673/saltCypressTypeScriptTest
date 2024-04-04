import {helper} from "../page-objects/helper";

describe("Public API tests", () => {
  it("Checking public API", () => {
    cy.request('GET', Cypress.env("apiUrl")+'/info')
        .then((response) => {
            //Check GET response code whether it is 200
            expect(response.status).to.equal(200);
            //Check whether properties: name, telephone, fax, email have values/not null
            expect(response.body).property('name').to.not.be.null;
            expect(response.body).property('telephone').to.not.be.null;
            expect(response.body).property('fax').to.not.be.null;
            expect(response.body).property('email').to.not.be.null;
        //Check media type in response
        //---> Media type is not coming in response
    })
  });
});

describe("Non-Public API tests", () => {
  it("Checking non-public API", () => {
    //Check GET response code and check whether it redirects to authentication failed response
    //Check whether different parameter "name" will have different results
    const nameValues = ['name', 'telephone', 'fax', 'email'];
    const responseCodes = [401, 400, 400, 400];
    for(let i=0; i<=nameValues.length-1; i++){
        cy.request({
            method: 'GET',
            url: Cypress.env("apiUrl")+'/search/masterCostItems?'+nameValues[i]+'=test&token=123&serviceId=web/edge&serviceVersion=1.5.18.2',
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.equal(responseCodes[i]);
        })
    }
  });

  it("Checking non-public API 2", () => {
        cy.request({
            method: 'GET',
            url: Cypress.env("apiUrl")+'/search/masterCostItems',
            failOnStatusCode: false
          }).then((response) => {
            //Check GET response code
            expect(response.status).to.equal(400);
            //Check response headers and get property 'Date'
            expect(response.headers['content-length']).to.eq('0');
            expect(response.headers['connection']).to.eq('keep-alive');
            expect(response.headers['server']).to.eq('nginx');
            expect(response.headers['x-cache']).to.eq('Error from cloudfront');
            expect(response.headers['via']).to.match(/([a-z]|[A-Z]|[0-9])/);
            expect(response.headers['x-amz-cf-pop']).to.eq('DEL54-P2');
            expect(response.headers['x-amz-cf-id']).to.match(/([a-z]|[A-Z]|[0-9])/);
            //verify date header in response
            //matching timestamp without seconds because seconds always differs while equating
            expect(response.headers['date']).to.contain(helper.getUtcDate());
        })
  });
});

