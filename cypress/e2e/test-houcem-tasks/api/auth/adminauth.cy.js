describe("AdminAuthController", () => {
  const generateRandomId = () => Cypress._.uniqueId("id_");
  let randomId = generateRandomId();

  it("should sign up a new admin", () => {
    const admin = {
      idAdmin: "Youssef",
      login: randomId,
      mdp: "youssef",
      nom: "yousef",
      prenom: "Massaabi",
      email: "mass@gmail.com",
      OperationsEtud: true,
      ImportExcel: false,
      OperationsEvent: true,
      OperationsEns: false,
    };

    cy.request("POST", "http://localhost:3000/admin/auth/signup", admin).then(
      (response) => {
        expect(response.status).to.eq(201);
      }
    );
  });

  it("should sign in an admin", () => {
    const signInUser = {
      login: randomId,
      mdp: "youssef",
    };

    cy.request(
      "POST",
      "http://localhost:3000/admin/auth/signin",
      signInUser
    ).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.access_token).to.exist;
    });
  });
});
