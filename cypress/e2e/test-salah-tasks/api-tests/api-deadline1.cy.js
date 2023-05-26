describe("api test deadline 1", () => {
  
    it("sign up alumni", () => {
      const data = {
        email: "john.doe@example.com",
        nom: "Doe",
        prenom: "John",
        dateNaissance: "1990-01-01",
        formation: "Computer Science",
        poste: "Software Engineer",
        EtudiantAluId: "109",
        dateObtentionDiplome: "2020-01-01",
        dateEmbacuhe: "2021-01-01",
        societe: "Acme Inc.",
        login: 109,
        verified : null,
        mdp:"test",
        pays: "Brésil",
      };
      cy.request("POST", "http://localhost:3000/etudiant/auth/signup/alumni", data).then(
        (resp) => {
          expect(resp.status).to.eq(201);
          expect(resp.body.email).to.eq(data.email);
          expect(resp.body.nom).to.eq(data.nom);
          expect(resp.body.prenom).to.eq(data.prenom);
        }
      );
    });

    it("changer mot de passe alumni", () => {
        const data = {
            id: "109",
            oldmdp: "test",
            mdp: "apitest",
        };
        cy.request("PUT", "http://localhost:3000/etudiant",data).then(
          (resp) => {
            expect(resp.status).to.eq(200);
          }
        );
    });

    it("get alumni", () => {
        cy.request("GET", "http://localhost:3000/etudiant-alumni/109").then(
          (resp) => {
            console.log(resp.body);
            expect(resp.status).to.eq(200);
          }
        );
    });

    it("delete alumni", () => {
        cy.request("DELETE", "http://localhost:3000/etudiant-alumni/109").then(
          (resp) => {
            expect(resp.status).to.eq(200);
          }
        );
    });

});
