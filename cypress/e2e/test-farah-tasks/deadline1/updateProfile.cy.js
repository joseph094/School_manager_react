describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("24000");
    cy.getByData("mdp").type("etu123");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="etudiant"]').click();
    // Fill in the form inputs with valid data

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit('http://localhost:3005/Editprofile/22')
  })
  // Update Profile - Positive Case
it("should update a profile with valid data", () => {
  const mockData = {
    EtudiantActId: "",
    nom: "John Doe",
    email: "john.doe@example.com",
    niveau: "BAC+3",
    Classe: "A",
    dateNaissance: "1990-01-01",
  };

  // Intercept the PUT request to update the profile
  cy.intercept("PUT", `http://localhost:3000/etudiant-actuel/update/${mockData.EtudiantActId}`, {
    statusCode: 200,
    body: mockData,
  }).as("Editprofile");

  cy.visit(`http://localhost:3005/Editprofile/${mockData.EtudiantActId}`);

  // Fill in the form inputs with updated data
  cy.get('[data-test="nom"]').clear().type(mockData.nom);
  cy.get('[data-test="email"]').clear().type(mockData.email);
  cy.get('[data-test="niveau"]').clear().type(mockData.niveau);
  cy.get('[data-test="Classe"]').clear().type(mockData.Classe);
  cy.get('[data-test="dateNaissance"]').clear().type(mockData.dateNaissance);

  // Submit the form
  cy.get('[data-test="valider"]').click();

  // Expect the profile to be updated successfully
  cy.wait("@Editprofile").then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
    expect(interception.response.body).to.deep.equal(mockData);
  });

  // Expect the user to be redirected to the appropriate page
  cy.url().should("include", "/profile");
});

// Update Profile - Negative Case
it("should show an error message when the form is submitted with invalid data", () => {
  const mockData = {
    EtudiantActId: "",
    nom: 1,
    email: "john.doe@example.com",
    niveau: "BAC+3",
    Classe: 3,
    dateNaissance: "1990-01-01",
  };

  // Intercept the PUT request to update the profile with an error response
  cy.intercept("PUT", `http://localhost:3000/etudiant-actuel/update/${mockData.EtudiantActId}`, {
    statusCode: 400,
    body: { error: "Invalid data" },
  }).as("Editprofile");

  cy.visit(`http://localhost:3005/Editprofile/${mockData.EtudiantActId}`);

  // Fill in the form inputs with updated data
  cy.get('[data-test="nom"]').clear().type(mockData.nom);
  cy.get('[data-test="email"]').clear().type(mockData.email);
  cy.get('[data-test="niveau"]').clear().type(mockData.niveau);
  cy.get('[data-test="Classe"]').clear().type(mockData.Classe);
  cy.get('[data-test="dateNaissance"]').clear().type(mockData.dateNaissance);

  // Submit the form
  cy.get('[data-test="valider"]').click();

  // Expect an error message to be displayed
  cy.get(".error-message").should("be.visible").contains("Invalid data");

  // Expect the PUT request to be intercepted
  cy.wait("@Editprofile").then((interception) => {
    expect(interception.response.statusCode).to.equal(400);
    expect(interception.response.body).to.deep.equal({ error: "Invalid data" });
  });
});



})