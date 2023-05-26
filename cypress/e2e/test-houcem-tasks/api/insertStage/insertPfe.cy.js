describe("addpfe API", () => {
  const generateRandomId = () => Cypress._.uniqueId("");
  let randomId = generateRandomId();
  it("adds a PFE successfully", () => {
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
    const stage = {
      sujet: "Dashboarding Agricole v2",
      societe: "sofrecom",
      type: "Web",
      pays: "tunisie",
    };
    cy.request(
      "POST",
      `http://localhost:3000/etudiant-actuel/addpfe/${randomId}`,
      stage
    ).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.pfe.sujet).to.equal("Dashboarding Agricole v2");
      expect(response.body.pfe.type).to.equal("Web");
      expect(response.body.pfe.pays).to.equal("tunisie");

      expect(response.body.pfe.societe).to.equal("sofrecom");
    });
  });
});
