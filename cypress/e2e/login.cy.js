describe("Login", () => {
  it("Scenario authentification admin et CRUD ETUDIANTS ", () => {
    // window.localStorage.removeItem("token");
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("123456");
    cy.getByData("mdp").type("admin");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/ajouteretudiant");
    cy.get('[data-test="nom"]').type("Doe");
    cy.get('[data-test="prenom"]').type("John");
    cy.get('[data-test="cin"]').type("{selectall}{backspace}").type("123456");
    cy.get('[data-test="email"]').type("johndoe@example.com");
    cy.get('[data-test="classe"]').type("ing");

    // Scroll to the parent element of the niveau input field first
    cy.getByData("niveau")
      .scrollTo("bottom", {
        container: '[data-test="niveau"]',
        ensureScrollable: false,
      })
      //   .should("be.visible")
      .type("3");
    // Scroll to the parent element of the date input field first
    cy.get('[data-test="date"]')
      .scrollTo("bottom", {
        container: '[data-test="date"]',
        ensureScrollable: false,
      })
      .type("1990-01-01");

    // Scroll to the parent element of the Type select field first
    cy.get('[data-test="Type"]')
      //   .parents(".MuiFormControl-root")
      .scrollIntoView()
      .scrollTo("bottom", { ensureScrollable: false })
      // .should("be.visible")
      .click();
    cy.get('[data-value="Actuel"]').click(); // Click on the MenuItem with a value of "admin"

    // Scroll to the parent element of the valider button first
    cy.get('[data-test="valider"]').scrollIntoView().click();
    cy.url().should("eq", "http://localhost:3005/");

    cy.visit("http://localhost:3005/modifyetudiants");

    cy.get('[data-test="cin"]')
      .scrollTo("bottom", {
        container: '[data-test="cin"]',
        ensureScrollable: false,
      })
      .type("{selectall}{backspace}")
      .type("123456");
    //   .should("be.visible")

    cy.get('[data-test="type"]').click();
    cy.get('[data-value="Actuel"]').click();

    cy.get('[data-test="chercher"]').click();

    cy.get('[data-test="nom"]').type("{selectall}{backspace}").type("John");
    cy.get('[data-test="prenom"]').type("{selectall}{backspace}").type("Doe");
    cy.get('[data-test="date"]').type("1995-05-12");
    cy.get('[data-test="classe"]').type("{selectall}{backspace}").type("12B");
    cy.get('[data-test="niveau"]').type("{selectall}{backspace}").type("2");
    cy.get('[data-test="email"]')
      .type("{selectall}{backspace}")
      .type("johndoe@gmail.com");

    cy.get('[data-test="valider"]').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });

    cy.visit("http://localhost:3005/getetudiant");

    //ETUDIANT NON AJOUTE
    // cy.get('[data-test="cin"]')
    //   .type("{selectall}{backspace}")
    //   .type("123456788");
    // cy.get('[data-test="type"]').click();
    // cy.get('[data-value="Actuel"]').click();
    // cy.contains("Checher").click();
    // cy.contains("Impossible de trouver cet Etudiant !");
    //ETUDIANT AJOUTE
    cy.visit("http://localhost:3005/getetudiant");

    cy.get('[data-test="cin"]').type("{selectall}{backspace}").type("123456");
    cy.get('[data-test="type"]').click();
    cy.get('[data-value="Actuel"]').click();
    cy.contains("Checher").click();
    // A fixer !

    // cy.get('[data-test="nom"]').should("have.value", "John");
    // cy.get('[data-test="prenom"]').should("have.value", "Doe");
    // cy.get('[data-test="email"]').should("have.value", "john.doe@example.com");

    cy.get('[data-test="date"]').contains("1995-05-12");
    cy.get('[data-test="delete"]').click();
    cy.visit("http://localhost:3005/getetudiant");

    cy.get('[data-test="cin"]').type("{selectall}{backspace}").type("123456");
    cy.get('[data-test="type"]').click();
    cy.get('[data-value="Actuel"]').click();
    cy.contains("Checher").click();
    cy.contains("Impossible de trouver cet Etudiant !");
  });
});
