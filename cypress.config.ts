import { defineConfig } from "cypress";
  export const cypressConfig: Partial<Cypress.ConfigOptions> = { 
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
        
      },
      //supportFile: "support",
      specPattern: "./cypress/e2e/src/specs/**/*.cy.{js,jsx,ts,tsx}",
      env: {
        url: 'https://qa-test.cuat.marcura.com/dashboard',
        apiUrl: 'https://exchange.da-desk.com/agency-api/1.1'
      }
    },
  }
  export default defineConfig({ ...cypressConfig })
