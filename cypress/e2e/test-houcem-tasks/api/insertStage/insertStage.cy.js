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
      id: "2",
      sujet: "Dev mob",
      dateDebut: "15-05-2023",
      dateFin: "15-06-2023",
      societe: "Extense",
    };
    cy.request(
      "POST",
      `http://localhost:3000/etudiant-actuel/addstage/${randomId}`,
      stage
    ).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.stages[0].id).to.equal("2");
      expect(response.body.stages[0].sujet).to.equal("Dev mob");
      expect(response.body.stages[0].dateDebut).to.equal("15-05-2023");

      expect(response.body.stages[0].societe).to.equal("Extense");
    });
  });
});
