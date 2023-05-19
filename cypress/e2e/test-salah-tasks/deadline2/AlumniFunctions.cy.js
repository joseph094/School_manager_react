describe('Verifie les fonctionnalitées pour un alumni', () => {
    beforeEach(() => {
        cy.request({
          method: 'DELETE',
          url: 'http://localhost:3000/etudiant-alumni/12345'
        }).then((resp) => {
            // redirect status code is 302
            expect(resp.status).to.eq(200)});
        
            cy.visit('http://localhost:3005/signup');

            // Fill in the form inputs
            cy.get('[data-test="nom"]').type('Doe');
            cy.get('[data-test="prenom"]').type('John');
            cy.get('[data-test="dateNaissance"]').type('1990-01-01');
            cy.get('[data-test="formation"]').type('Computer Science');
            cy.get('[data-test="poste"]').type('Software Engineer');
            cy.get('[data-test="email"]').type('john.doe@example.com');
            cy.get('[data-test="login"]').type('12345');
            cy.get('[data-test="mdp"]').type('password');
            cy.get('[data-test="confirmPassword"]').type('password');
            cy.get('[data-test="dateObtentionDiplome"]').type('2020-01-01');
            cy.get('[data-test="dateEmbacuhe"]').type('2021-01-01');
            cy.get('[data-test="societe"]').type('Acme Inc.');
            cy.getByData("pays").select("Brésil");
            cy.get('[data-test="submit"]').click();
    });
    it('Alumni Not Verified', () => {
        cy.location('pathname').should('eq', '/signin');
        cy.getByData("login").type("12345");
        cy.getByData("mdp").type("password");
        cy.get("#demo-simple-select").click();
        cy.get('[data-value="etudiant"]').click();
        cy.getByData("valider").click({ force: true });
        cy.location('pathname').should('eq', '/');
        cy.wait(5000);
        cy.contains("Voir Status");
        cy.contains("Changer Mot De Passe");

    })

    it('Alumni Verified', () => {
        cy.intercept("GET", `http://localhost:3000/etudiant/12345`, {
            statusCode: 200,
            body: {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "145",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: true
            },
          }).as("etudiant");

        cy.location('pathname').should('eq', '/signin');
        cy.getByData("login").type("12345");
        cy.getByData("mdp").type("password");
        cy.get("#demo-simple-select").click(); // Click on the select element
        cy.get('[data-value="etudiant"]').click();
        cy.getByData("valider").click({ force: true });
        cy.location('pathname').should('eq', '/');
        
        cy.wait("@etudiant");
        cy.wait(5000);
        cy.contains("Voir Status");
        cy.contains("Changer Mot De Passe");
        cy.contains("Lister Events");
        cy.contains("Demander Vacations");
        cy.contains("Demander Contrat");
        cy.contains("Publications");
        cy.contains("My Publications");

    })

    it('Alumni Refused', () => {
        cy.intercept("GET", `http://localhost:3000/etudiant/12345`, {
            statusCode: 200,
            body: {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "145",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: false
            },
          }).as("etudiant");
          cy.location('pathname').should('eq', '/signin');
            cy.getByData("login").type("12345");
            cy.getByData("mdp").type("password");
            cy.get("#demo-simple-select").click(); // Click on the select element
            cy.get('[data-value="etudiant"]').click();
            cy.getByData("valider").click({ force: true });
            cy.location('pathname').should('eq', '/');
        
        cy.wait("@etudiant");
        cy.wait(5000);
        cy.contains("Voir Status");

    })
});