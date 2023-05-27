describe("etudiantAuthController", () => {
  const generateRandomId = () => Cypress._.uniqueId("");
  let randomId = generateRandomId();

  it("should sign up an alumni", () => {
    const etudiant = {
      EtudiantId: randomId,
      nom: "Mohsen",
      prenom: "hsouna",
      login: randomId,
      mdp: "231788",
    };

    cy.request(
      "POST",
      "http://localhost:3000/etudiant-alumni/inserting",
      etudiant
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should sign up an actuel", () => {
    const etudiant = {
      EtudiantId: randomId,
      nom: "Mohsen",
      prenom: "hsouna",
      login: randomId,
      mdp: "231788",
    };

    cy.request(
      "POST",
      "http://localhost:3000/etudiant-actuel/insert",
      etudiant
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should sign in an etudiant", () => {
    const userDto = {
      login: randomId,
      mdp: "231788",
    };

    cy.request(
      "POST",
      "http://localhost:3000/etudiant/auth/signin",
      userDto
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
