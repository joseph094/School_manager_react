describe("EtudiantActuelService", () => {
  const generateRandomId = () => Cypress._.uniqueId("");
  let randomId = generateRandomId();
  // it('should get all etudiants', () => {
  //   cy.request('GET', '/etudiant-actuel').then((response) => {
  //     expect(response.status).to.eq(201);
  //   });
  // });

  // it('should find one etudiant', () => {
  //   const etudiantId = '123456789';

  //   cy.request('GET', `/etudiant-actuel/${etudiantId}`).then((response) => {
  //     expect(response.status).to.eq(201);
  //   });
  // });

  it("should insert one etudiant", () => {
    const etudiant = {
      cin: randomId,
      login: randomId,
      mdp: "130820",
      email: "pivario1234@gmail.com",
      nom: "Houcem",
      prenom: "Mabrouki",
      dateNaissance: "11/17/2017",
      formation: "ing",
      poste: "non",
      visibilite: "oui",
      alumni: true,

      EtudiantActId: randomId,
    };

    cy.request(
      "POST",
      "http://localhost:3000/etudiant-actuel/insert",
      etudiant
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
    cy.request("GET", `http://localhost:3000/etudiant-actuel/${randomId}`).then(
      (response) => {
        expect(response.body.nom).to.eq("Houcem");
        expect(response.body.email).to.eq("pivario1234@gmail.com");
        expect(response.body.login).to.eq(randomId);
      }
    );
  });

  it("should update one etudiant", () => {
    const etudiantId = randomId;
    const updatedEtudiant = {
      cin: randomId,
      login: randomId,
      mdp: "130820",
      email: "pivario1234@gmail.com",
      nom: "Updated",
      prenom: "Mabrouki",
      dateNaissance: "11/17/2017",
      formation: "ing",
      poste: "non",
      visibilite: "oui",
      alumni: true,

      EtudiantActId: randomId,
    };

    cy.request(
      "PUT",
      `http://localhost:3000/etudiant-actuel/update`,
      updatedEtudiant
    ).then((response) => {
      expect(response.status).to.eq(200);
      cy.wrap(response.body.nom).should("eq", "Updated");
    });
  });

  it("should add a stage for an etudiant", () => {
    const etudiantId = randomId;
    const stage = {
      sujet: "Stage Title",
    };

    cy.request(
      "POST",
      `http://localhost:3000/etudiant-actuel/addstage/${etudiantId}`,
      stage
    ).then((response) => {
      expect(response.status).to.eq(201);
      cy.wrap(response.body.stages[0]).should("not.be.empty");
    });
  });

  //   it("should update CV for an etudiant", () => {
  //     const etudiantId = randomId;
  //     const cv = {
  //       competences: ["Skill 1", "Skill 2"],
  //       experience: "Work experience",
  //       formation: "Education background",
  //     };

  //     cy.request(
  //       "PUT",
  //       `http://localhost:3000/etudiant-actuel/updateCv/${etudiantId}`,
  //       cv
  //     ).then((response) => {
  //       expect(response.status).to.eq(201);
  //     });
  //   });

  it("should delete one etudiant", () => {
    const etudiantId = randomId;

    cy.request({
      method: "DELETE",
      url: `http://localhost:3000/etudiant-actuel/${etudiantId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request({
      method: "GET",
      url: `http://localhost:3000/etudiant-actuel/all`,
      failOnStatusCode: false,
    }).then((response) => {
      const f = response.body.filter((et) => et.login == randomId);
      expect(f.length).to.eq(0);
    });
  });
});
