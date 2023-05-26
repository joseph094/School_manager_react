describe("AjouterAnneUniversitaire", () => {
  beforeEach(() => {
    cy.viewport(375, 667);

    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("123456");
    cy.getByData("mdp").type("admin");
    cy.get("#demo-simple-select").click();
    cy.get('[data-value="admin"]').click();
    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
  });

  context("Responsive behavior and form submission", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3005/ajouteranneuniversitaire");
    });

    it("submits the form successfully in different viewports", () => {
      const viewports = [
        { name: "iphone-6", width: 375, height: 667 },
        { name: "ipad-2", width: 768, height: 1024 },
      ];

      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        cy.get('input[name="anne"]').type("2022-2023");
        cy.get('input[name="semestre"]').type("1");
        cy.get('button[data-test="valider"]').click();

        cy.get('[role="alert"]').should("not.exist");
        cy.url().should("equal", "http://localhost:3005/");

        cy.visit("http://localhost:3005/ajouteranneuniversitaire");
      });
    });
  });
});
