describe("Choisirpfe component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("12355");
    cy.getByData("mdp").type("231788");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="enseignant"]').click(); // Click on the MenuItem with a value of "admin"
    // Fill in the form inputs with valid data

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
  });
  it("Allows encadrerPfe to be called", () => {
    cy.visit("/choisirpfe"); // replace with the correct route

    cy.get("[data-test=sujet]").first().click({ force: true });
    cy.location("pathname").should("include", "/pfe/");
    cy.visit("/choisirpfe"); // replace with the correct route

    cy.get("[data-test=etudiant]").first().click();
    cy.location("pathname").should("include", "/etudiant");
    cy.visit("/choisirpfe"); // replace with the correct route

    cy.get("[data-test=encadrer]").first().click();
    cy.location("pathname").should("include", "/enseignantdashboard");
  });

  it("displays a list of PFES and allows encadrerPfe to be called", () => {
    cy.intercept("GET", "http://localhost:3000/etudiant-actuel/pfe", {
      statusCode: 200,
      body: [
        {
          idpfe: 1,
          sujet: "Test PFE 1",
          etudiant: { nom: "John", prenom: "Doe", login: "jdoe" },
        },
        {
          idpfe: 2,
          sujet: "Test PFE 2",
          etudiant: { nom: "Jane", prenom: "Doe", login: "jane" },
        },
      ],
    }).as("getPfeData");

    // visit the component
    cy.visit("http://localhost:3005/choisirpfe");

    // wait for the XHR request to complete
    cy.wait("@getPfeData");

    // get the table rows
    cy.get("table tbody tr").as("tableRows");

    // verify that there are two rows displayed
    cy.get("@tableRows").should("have.length", 2);

    // verify that the first row displays the correct data
    cy.get("@tableRows")
      .eq(0)
      .within(() => {
        cy.contains("Test PFE 1");
        cy.contains("John Doe");
        cy.contains("Encadrer");
      });

    // verify that the second row displays the correct data
    cy.get("@tableRows")
      .eq(1)
      .within(() => {
        cy.contains("Test PFE 2");
        cy.contains("Jane Doe");
        cy.contains("Encadrer");
      });
  });
});
