describe("BasculerAnne Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/evenement", {
      // Return an array instead of an object
      // Also add a mock anneuniversitaire property to each event
      body: [
        {
          id: 1,
          nom: "Event 1",
          dateEvenement: "2023-06-01",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          anneuniversitaireName: "2022-2023",
        },
        {
          id: 2,
          name: "Event 2",
          date: "2023-06-15",
          description:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          anneuniversitaireName: "2022-2023",
        },
      ],
    }).as("getEvents");

    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("123456");
    cy.getByData("mdp").type("admin");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/ajouteretudiant");
    cy.visit("http://localhost:3005/ajouteranneuniversitaire"); // Replace with the actual URL of the component
    cy.visit("/basculer");
  });

  it("should display the list of events for a specific academic year", () => {
    cy.get("input[name='anne']").type("2022-2023");
    cy.wait("@getEvents").then((interception) => {
      const filteredEvents = interception.response.body.filter(
        (event) => event.anneuniversitaireName === "2022-2023"
      );
      cy.get(".custom-table tbody tr").should(
        "have.length",
        filteredEvents.length
      );
      filteredEvents.forEach((event, index) => {
        cy.get(".custom-table tbody tr")
          .eq(index)
          .within(() => {
            cy.get(".colonne")
              .eq(0)
              .should("have.text", event.idEvenement.toString());
            cy.get(".colonne").eq(1).should("have.text", event.nom);
            cy.get(".colonne").eq(2).should("have.text", event.dateEvenement);
            cy.get(".colonne").eq(3).should("have.text", event.description);
          });
      });
    });
  });
});
