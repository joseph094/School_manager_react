describe("Insert Stage Ete", () => {
  it("should fill in the form and submit successfully", () => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("123456");
    cy.getByData("mdp").type("123456");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="etudiant"]').click(); // Click on the MenuItem with a value of "admin"
    // Fill in the form inputs with valid data

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit("http://localhost:3005/insertstage");
    cy.get('[data-test="sujet"]').type("Fake sujet");
    cy.get('[data-test="Description"]').type("Fake description");
    cy.get('[data-test="societe"]').type("Fake societe");
    cy.get('[data-test="date-debut"]').type("2022-06-01");
    cy.get('[data-test="date-fin"]').type("2022-07-01");
    cy.get('[data-test="valider"]').click();
    cy.url().should("include", "/");
  });

  // it("should display an error message if the form submission fails", () => {
  //   cy.visit("http://localhost:3005/signin");
  //   cy.getByData("login").type("123456");
  //   cy.getByData("mdp").type("123456");
  //   cy.get("#demo-simple-select").click(); // Click on the select element
  //   cy.get('[data-value="etudiant"]').click(); // Click on the MenuItem with a value of "admin"
  //   // Fill in the form inputs with valid data

  //   cy.getByData("valider").click({ force: true });
  //   cy.location("pathname").should("eq", "/");
  //   cy.visit("http://localhost:3005/insertstage");
  //   cy.intercept("POST", "http://localhost:3000/etudiant-actuel/addstage/*", {
  //     statusCode: 500,
  //     body: { error: "Internal Server Error" },
  //   });
  //   cy.get('[data-test="sujet"]').type("Fake sujet");
  //   cy.get('[data-test="Description"]').type("Fake description");
  //   cy.get('[data-test="societe"]').type("Fake societe");
  //   cy.get('[data-test="date-debut"]').type("2022-06-01");
  //   cy.get('[data-test="date-fin"]').type("2022-07-01");
  //   cy.get('[data-test="valider"]').click();
  //   cy.get('[data-test="alert"]').should("exist");
  // });
});
