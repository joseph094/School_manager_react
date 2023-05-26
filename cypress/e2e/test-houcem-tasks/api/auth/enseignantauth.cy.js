describe("AuthController", () => {
  const generateRandomId = () => Cypress._.uniqueId("id_");
  let randomId = generateRandomId();
  it("should sign up a new user", () => {
    const enseignant = {
      idEnseignant: "10",
      nom: "Mohsen",
      prenom: "hsouna",
      login: randomId,
      mdp: "231788",
    };

    cy.request(
      "POST",
      "http://localhost:3000/enseignant/auth/signUp",
      enseignant
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should sign in a user", () => {
    const signInUserDTO = {
      login: randomId,
      password: "231788",
    };

    cy.request(
      "POST",
      "http://localhost:3000/enseignant/auth/signIn",
      signInUserDTO
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
