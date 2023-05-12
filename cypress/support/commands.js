// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});
Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3005/signin");
  cy.getByData("login").type("123456");
  cy.getByData("mdp").type("admin");
  cy.get("#demo-simple-select").click(); // Click on the select element
  cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"
  cy.getByData("valider").click({ force: true });
});
