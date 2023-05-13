describe("InsertPFE + Voir Liste PFE", () => {
  let pfes;
  //   it("should submit the form with valid data", () => {
  //     cy.visit("http://localhost:3005/signin");
  //     cy.getByData("login").type("123456");
  //     cy.getByData("mdp").type("123456");
  //     cy.get("#demo-simple-select").click(); // Click on the select element
  //     cy.get('[data-value="etudiant"]').click(); // Click on the MenuItem with a value of "admin"
  //     // Fill in the form inputs with valid data

  //     cy.getByData("valider").click({ force: true });
  //     cy.location("pathname").should("eq", "/ajouteretudiant");
  //     cy.visit("http://localhost:3005/insertpfe");
  //     cy.get('[data-test="sujet"]').type("Some valid subject");
  //     cy.get('[data-test="type"]').type("Some valid type");
  //     cy.get('[data-test="societe"]').type("Some valid company");
  //     cy.get('[data-test="pays"]').type("Some valid country");

  //     // Submit the form
  //     cy.get('[data-test="valider"]').click();

  //     // Expect the user to be redirected to "/"
  //     cy.url().should("include", "/");
  //   });

  //   it("should show an error message when the form is submitted with invalid data", () => {
  //     cy.visit("http://localhost:3005/signin");
  //     cy.getByData("login").type("123456");
  //     cy.getByData("mdp").type("123456");
  //     cy.get("#demo-simple-select").click(); // Click on the select element
  //     cy.get('[data-value="etudiant"]').click(); // Click on the MenuItem with a value of "admin"
  //     // Fill in the form inputs with valid data

  //     cy.getByData("valider").click({ force: true });
  //     cy.location("pathname").should("eq", "/ajouteretudiant");
  //     cy.visit("http://localhost:3005/insertpfe");

  //     // Submit the form
  //     cy.get('[data-test="valider"]').click();

  //     // Expect an error message to be shown
  //     cy.get('[data-test="alert"]').should("be.visible");
  //   });

  it("displays all fetched data", () => {
    window.localStorage.removeItem("token");
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("123456");
    cy.getByData("mdp").type("admin");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/ajouteretudiant");
    const mockData = [
      {
        idpfe: 1,
        sujet: "Lorem ipsum",
        type: "Type A",
        pays: "France",
        societe: "ACME Inc.",
      },
      {
        idpfe: 2,
        sujet: "Dolor sit amet",
        type: "Type B",
        pays: "USA",
        societe: "Globex Corporation",
      },
    ];

    cy.intercept("GET", "http://localhost:3000/pfe", {
      statusCode: 200,
      body: mockData,
    });
    cy.visit("http://localhost:3005/getpfe");

    cy.get("table").should("be.visible");
    cy.get("table tbody tr").should("have.length", mockData.length);

    cy.get("table tbody tr").each(($row, index) => {
      cy.wrap($row)
        .find("td")
        .eq(0)
        .should("contain.text", mockData[index].sujet);
      cy.wrap($row)
        .find("td")
        .eq(1)
        .should("contain.text", mockData[index].type);
      cy.wrap($row)
        .find("td")
        .eq(2)
        .should("contain.text", mockData[index].pays);
      cy.wrap($row)
        .find("td")
        .eq(3)
        .should("contain.text", mockData[index].societe);
    });
  });
});
