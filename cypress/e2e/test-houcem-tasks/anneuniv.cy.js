describe("AjouterAnneUniversitaire", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("123456");
    cy.getByData("mdp").type("admin");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit("localhost:3005/ajouteranneuniversitaire");
  });

  it("displays the correct form inputs", () => {
    cy.get('input[name="anne"]').should("exist");
    cy.get('input[name="semestre"]').should("exist");
  });

  it("submits the form successfully", () => {
    // Stub the Axios POST request to always return success
    cy.intercept("POST", "http://localhost:3000/anneuniversitaire", {
      statusCode: 200,
      body: {},
    });

    cy.get('input[name="anne"]').type("2022-2023");
    cy.get('input[name="semestre"]').type("1");
    cy.get('button[data-test="valider"]').click();

    // Check if the error alert is not visible and the user is redirected to the homepage
    cy.get('[role="alert"]').should("not.exist");
    cy.url().should("equal", "http://localhost:3005/"); // Replace with the actual URL of the homepage
  });
});
