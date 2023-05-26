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

Cypress.Commands.add("loginAdmin", () => {
  //window.localStorage.removeItem("token")
  cy.visit("http://localhost:3005/signin");
  cy.getByData("login").type("25023123");
  cy.getByData("mdp").type("youssef");
  cy.get("#demo-simple-select").click(); // Click on the select element
  cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"
  cy.getByData("valider").click({ force: true });
  cy.location("pathname").should("eq", "/");

});
Cypress.Commands.add("loginEtudiant", (email, password) => {
  //window.localStorage.removeItem("token")
  cy.visit("http://localhost:3005/signin");
  cy.getByData("login").type(email);
  cy.getByData("mdp").type(password);
  cy.get("#demo-simple-select").click(); // Click on the select element
  cy.get('[data-value="etudiant"]').click(); // Click on the MenuItem with a value of "admin"
  cy.getByData("valider").click({ force: true });
  cy.location("pathname").should("eq", "/");
  cy.wait(1000)

});
Cypress.Commands.add("loginAdmiApi", () => {
  //window.localStorage.removeItem("token")
  const signInUser = {
    login: 25023123,
    mdp: "youssef",
  };

  cy.request(
    "POST",
    "http://localhost:3000/admin/auth/signin",
    signInUser
  ).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.access_token).to.exist;
  });

});

