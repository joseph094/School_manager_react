describe("Voir Statistiques Alumni", () => {
  beforeEach(() => {
    cy.visit("/signin");
    cy.getByData("login").type("25023123");
    cy.getByData("mdp").type("youssef");
    cy.get("#demo-simple-select").click();
    cy.get('[data-value="admin"]').click();
    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
  });
  it("Voir Stats Normal Size", () => {
    cy.visit("/generalstats");
    cy.wait(5000);
    cy.contains("Promotions");
    cy.contains("Top 5 Promotions");
    cy.contains("Charts");
    cy.contains("Par Pays");
    cy.contains("Top 5 Pays");
    cy.contains("Map Chart");
    cy.contains("Par Societe");
    cy.contains("Top 5 Societes");
    cy.contains("Chart");
  });
  it("Voir Stats Responsive size", () => {
    cy.viewport(450, 667);
    cy.visit("/generalstats");
    cy.wait(5000);
    cy.contains("Promotions");
    cy.contains("Top 5 Promotions");
    cy.contains("Charts");
    cy.contains("Par Pays");
    cy.contains("Top 5 Pays");
    cy.contains("Map Chart");
    cy.contains("Par Societe");
    cy.contains("Top 5 Societes");
    cy.contains("Chart");
  });
});
