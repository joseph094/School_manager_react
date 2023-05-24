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
    cy.visit('http://localhost:3005/updateCV/9')
  })

  // Update CV - Positive Case
  it("should update a CV with valid data", () => {
    const mockData = {
      idCv: 1,
      bio: "Bio description",
      location: "Location",
      linkedIn: "https://www.linkedin.com/in/username",
      diplome: [],
      Competences: [],
      formation: [
        {
          title: "Formation title",
          emplacement: "Formation location",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          description: "Formation description",
        },
      ],
      experience: [
        {
          title: "Experience title",
          emplacement: "Experience location",
          startDate: "2020-01-01",
          endDate: "2021-12-31",
          description: "Experience description",
        },
      ],
    };

    // Intercept the PUT request to update the CV
    cy.intercept("PUT", `http://localhost:3000/Cv/update/${mockData.idCv}`, {
      statusCode: 200,
      body: mockData,
    }).as("updateCv");

    cy.visit(`http://localhost:3005/updatecv/${mockData.idCv}`);

    // Fill in the form inputs with updated data
    cy.get('[data-test="bio"]').clear().type(mockData.bio);
    cy.get('[data-test="location"]').clear().type(mockData.location);
    cy.get('[data-test="linkedIn"]').clear().type(mockData.linkedIn);
    cy.get('[data-test="diplome"]').clear(); // Clear diplome input, assuming it's a text input
    cy.get('[data-test="competences"]').clear(); // Clear competences input, assuming it's a text input

    // Fill in formation data
    cy.get('[data-test="formation-title"]').clear().type(mockData.formation[0].title);
    cy.get('[data-test="formation-location"]').clear().type(mockData.formation[0].emplacement);
    cy.get('[data-test="formation-startDate"]').type(mockData.formation[0].startDate);
    cy.get('[data-test="formation-endDate"]').type(mockData.formation[0].endDate);
    cy.get('[data-test="formation-description"]').clear().type(mockData.formation[0].description);

    // Fill in experience data
    cy.get('[data-test="experience-title"]').clear().type(mockData.experience[0].title);
    cy.get('[data-test="experience-location"]').clear().type(mockData.experience[0].emplacement);
    cy.get('[data-test="experience-startDate"]').type(mockData.experience[0].startDate);
    cy.get('[data-test="experience-endDate"]').type(mockData.experience[0].endDate);
    cy.get('[data-test="experience-description"]').clear().type(mockData.experience[0].description);

    // Submit the form
    cy.get('[data-test="valider"]').click();

    // Expect the CV to be updated successfully
    cy.wait("@updateCv").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.deep.equal(mockData);
    });

    // Expect the user to be redirected to the updated CV page
    cy.url().should("include", `/cv/${mockData.idCv}`);
  });

  // Update CV - Negative Case
  it("should show an error message when the form is submitted with invalid data", () => {
    const mockData = {
      idCv: "invalidId",
      bio: 1,
      location: 0,
      linkedIn: 3,
      diplome: "invalidDiplome",
      Competences: 8,
      formation: [
        {
          title: 1,
          emplacement: 0,
          startDate: "2023-01-01",
          endDate: "2020-05-01",
          description: 3,
        },
      ],
      experience: [
        {
          title: 1,
          emplacement: 0,
          startDate: "2023-01-01",
          endDate: "2020-05-01",
          description: 3,
        },
      ],
    };

    // Intercept the PUT request to update the CV with an error response
    cy.intercept("PUT", `http://localhost:3000/Cv/update/${mockData.idCv}`, {
      statusCode: 400,
      body: { error: "Invalid data" },
    }).as("updateCv");

    cy.visit(`http://localhost:3005/updatecv/${mockData.idCv}`);

    // Fill in the form inputs with updated data
    cy.get('[data-test="bio"]').clear().type(mockData.bio);
    cy.get('[data-test="location"]').clear().type(mockData.location);
    cy.get('[data-test="linkedIn"]').clear().type(mockData.linkedIn);
    
    cy.get('[data-test="Competences"]').clear().type(mockData.Competences);

    // Fill in formation data
    cy.get('[data-test="formation-title"]').clear().type(mockData.formation[0].title);
    cy.get('[data-test="formation-location"]').clear().type(mockData.formation[0].emplacement);
    cy.get('[data-test="formation-startDate"]').clear().type(mockData.formation[0].startDate);
    cy.get('[data-test="formation-endDate"]').clear().type(mockData.formation[0].endDate);
    cy.get('[data-test="formation-description"]').clear().type(mockData.formation[0].description);

    // Fill in experience data
    cy.get('[data-test="experience-title"]').clear().type(mockData.experience[0].title);
    cy.get('[data-test="experience-location"]').clear().type(mockData.experience[0].emplacement);
    cy.get('[data-test="experience-startDate"]').clear().type(mockData.experience[0].startDate);
    cy.get('[data-test="experience-endDate"]').clear().type(mockData.experience[0].endDate);
    cy.get('[data-test="experience-description"]').clear().type(mockData.experience[0].description);

    // Submit the form
    cy.get('[data-test="valider"]').click();

    // Expect an error message to be displayed
    cy.get(".error-message").should("be.visible").contains("Invalid data");

    // Expect the PUT request to be intercepted
    cy.wait("@updateCv").then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body).to.deep.equal({ error: "Invalid data" });
    });
  });










})