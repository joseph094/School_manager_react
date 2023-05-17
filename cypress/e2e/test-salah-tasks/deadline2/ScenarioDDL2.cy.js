describe("GetUnverifiedAlumniAccounts Component", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3005/signin");
        cy.getByData("login").type("115");
        cy.getByData("mdp").type("admin");
        cy.get("#demo-simple-select").click(); // Click on the select element
        cy.get('[data-value="admin"]').click();
        cy.getByData("valider").click({ force: true });
    });
  
    it("scenario ddl 2 Valider un compte Alumni", () => {
        cy.wait(6000);
        const mockData = [
            {
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
                verified: null
            },
            {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "12345",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: false
            },
            {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "15",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: false
            },
            {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "2345",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: null
            }
        ];  
        cy.intercept("GET", "http://localhost:3000/etudiant-alumni/all", {
      statusCode: 200,
      body: mockData,
    }).as("etudiants");
        cy.visit("http://localhost:3005/getunverified");
        cy.wait("@etudiants")
        cy.get("h1").should("contain", "Unverified Accounts List");
        cy.get("th").eq(0).should("have.text", "ID");
        cy.get("th").eq(1).should("have.text", "Nom");
        cy.get("th").eq(2).should("have.text", "Prenom");
        cy.get("th").eq(3).should("have.text", "Date Naissance");
        cy.get("th").eq(4).should("have.text", "Formation");
        cy.get("th").eq(5).should("have.text", "Poste");
        cy.get("th").eq(6).should("have.text", "Action");
        let unverifiedAccounts = mockData.filter(account => account.verified === null);
        cy.get("[data-test='unverified'] tr").each(($row, index) => {
                cy.wrap($row)
                .find("td")
                .eq(0)
                .should("contain.text", unverifiedAccounts[index].EtudiantAluId);
              cy.wrap($row)
                .find("td")
                .eq(1)
                .should("contain.text", unverifiedAccounts[index].nom);
              cy.wrap($row)
                .find("td")
                .eq(2)
                .should("contain.text", unverifiedAccounts[index].prenom);
        });
        let refusedAccounts = mockData.filter(account => account.verified === false);
        cy.get("[data-test='refused'] tr").each(($row, index) => {
                cy.wrap($row)
                .find("td")
                .eq(0)
                .should("contain.text", refusedAccounts[index].EtudiantAluId);
                console.log(refusedAccounts[index].EtudiantAluId);
              cy.wrap($row)
                .find("td")
                .eq(1)
                .should("contain.text", refusedAccounts[index].nom);
              cy.wrap($row)
                .find("td")
                .eq(2)
                .should("contain.text", refusedAccounts[index].prenom);   
        });
        const randomIndex = Math.floor(Math.random() * unverifiedAccounts.length);
    cy.get("[data-test='unverified'] tr")
    .eq(randomIndex)
    .contains("Details")
    .click();
    cy.intercept("GET", `http://localhost:3000/etudiant-alumni/${unverifiedAccounts[randomIndex].EtudiantAluId}`, {
      statusCode: 200,
      body: {
        email: unverifiedAccounts[randomIndex].email,
        nom: unverifiedAccounts[randomIndex].nom,
        prenom: unverifiedAccounts[randomIndex].prenom,
        dateNaissance:unverifiedAccounts[randomIndex].dateNaissance,
        formation: unverifiedAccounts[randomIndex].formation,
        poste: unverifiedAccounts[randomIndex].poste,
        EtudiantAluId: unverifiedAccounts[randomIndex].EtudiantAluId,
        dateObtentionDiplome: unverifiedAccounts[randomIndex].dateObtentionDiplome,
        dateEmbacuhe: unverifiedAccounts[randomIndex].dateEmbacuhe,
        societe: unverifiedAccounts[randomIndex].societe,
        pays: unverifiedAccounts[randomIndex].pays,
        verified: null
    },
    }).as("etudiant");
    cy.wait("@etudiant");
    cy.contains(unverifiedAccounts[randomIndex].prenom+" "+unverifiedAccounts[randomIndex].nom);
    cy.contains('Email').next().should('contain', unverifiedAccounts[randomIndex].email);
    cy.contains('Date De Naissance').next().should('contain', unverifiedAccounts[randomIndex].dateNaissance);
    cy.contains('Formation').next().should('contain', unverifiedAccounts[randomIndex].formation);
    cy.contains('Poste').next().should('contain', unverifiedAccounts[randomIndex].poste);
    cy.contains('Date Obtention Diplome').next().should('contain', unverifiedAccounts[randomIndex].dateObtentionDiplome);
    cy.contains('Date Embauche').next().should('contain', unverifiedAccounts[randomIndex].dateEmbacuhe);
    cy.contains('Valider');
    cy.contains('Refuser');

    cy.intercept('PUT', `http://localhost:3000/etudiant-alumni/valider/${unverifiedAccounts[randomIndex].EtudiantAluId}`, {
    statusCode: 200,
}).as("validateAccount");

    cy.getByData("valider").click();
    let indexx = mockData.findIndex((etudiant) => etudiant.EtudiantAluId === unverifiedAccounts[randomIndex].EtudiantAluId);
    cy.wait("@validateAccount").then(() => {
        mockData[indexx].verified=true;
        cy.intercept("GET", "http://localhost:3000/etudiant-alumni/all", {
            statusCode: 200,
            body: mockData,
          }).as("etudiants");
        cy.location('pathname').should('eq', '/getunverified');
    })
    cy.get("[data-test='unverified'] tr").each(($row, index) => {
        cy.wrap($row)
        .find("td")
        .eq(0)
        .should("not.have.text", mockData[indexx].EtudiantAluId);
    });  
    
    })
    
    it("scenario ddl 2 refuser un compte Alumni", () => {
        cy.wait(6000);
        const mockData = [
            {
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
                verified: null
            },
            {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "12345",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: false
            },
            {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "15",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: false
            },
            {
                roles: [
                    "etudiant"
                ],
                email: "john.doe@example.com",
                nom: "Doe",
                prenom: "John",
                dateNaissance: "1990-01-01",
                formation: "Computer Science",
                poste: "Software Engineer",
                EtudiantAluId: "2345",
                dateObtentionDiplome: "2020-01-01",
                dateEmbacuhe: "2021-01-01",
                societe: "Acme Inc.",
                pays: "Brésil",
                verified: null
            }
        ];  
        cy.intercept("GET", "http://localhost:3000/etudiant-alumni/all", {
      statusCode: 200,
      body: mockData,
    }).as("etudiants");
        cy.visit("http://localhost:3005/getunverified");
        cy.wait("@etudiants")
        cy.get("h1").should("contain", "Unverified Accounts List");
        cy.get("th").eq(0).should("have.text", "ID");
        cy.get("th").eq(1).should("have.text", "Nom");
        cy.get("th").eq(2).should("have.text", "Prenom");
        cy.get("th").eq(3).should("have.text", "Date Naissance");
        cy.get("th").eq(4).should("have.text", "Formation");
        cy.get("th").eq(5).should("have.text", "Poste");
        cy.get("th").eq(6).should("have.text", "Action");
        let unverifiedAccounts = mockData.filter(account => account.verified === null);
        cy.get("[data-test='unverified'] tr").each(($row, index) => {
                cy.wrap($row)
                .find("td")
                .eq(0)
                .should("contain.text", unverifiedAccounts[index].EtudiantAluId);
              cy.wrap($row)
                .find("td")
                .eq(1)
                .should("contain.text", unverifiedAccounts[index].nom);
              cy.wrap($row)
                .find("td")
                .eq(2)
                .should("contain.text", unverifiedAccounts[index].prenom);
        });
        let refusedAccounts = mockData.filter(account => account.verified === false);
        cy.get("[data-test='refused'] tr").each(($row, index) => {
                cy.wrap($row)
                .find("td")
                .eq(0)
                .should("contain.text", refusedAccounts[index].EtudiantAluId);
                console.log(refusedAccounts[index].EtudiantAluId);
              cy.wrap($row)
                .find("td")
                .eq(1)
                .should("contain.text", refusedAccounts[index].nom);
              cy.wrap($row)
                .find("td")
                .eq(2)
                .should("contain.text", refusedAccounts[index].prenom);   
        });
        const randomIndex = Math.floor(Math.random() * unverifiedAccounts.length);
    cy.get("[data-test='unverified'] tr")
    .eq(randomIndex)
    .contains("Details")
    .click();
    cy.intercept("GET", `http://localhost:3000/etudiant-alumni/${unverifiedAccounts[randomIndex].EtudiantAluId}`, {
      statusCode: 200,
      body: {
        email: unverifiedAccounts[randomIndex].email,
        nom: unverifiedAccounts[randomIndex].nom,
        prenom: unverifiedAccounts[randomIndex].prenom,
        dateNaissance:unverifiedAccounts[randomIndex].dateNaissance,
        formation: unverifiedAccounts[randomIndex].formation,
        poste: unverifiedAccounts[randomIndex].poste,
        EtudiantAluId: unverifiedAccounts[randomIndex].EtudiantAluId,
        dateObtentionDiplome: unverifiedAccounts[randomIndex].dateObtentionDiplome,
        dateEmbacuhe: unverifiedAccounts[randomIndex].dateEmbacuhe,
        societe: unverifiedAccounts[randomIndex].societe,
        pays: unverifiedAccounts[randomIndex].pays,
        verified: null
    },
    }).as("etudiant");
    cy.wait("@etudiant");
    cy.contains(unverifiedAccounts[randomIndex].prenom+" "+unverifiedAccounts[randomIndex].nom);
    cy.contains('Email').next().should('contain', unverifiedAccounts[randomIndex].email);
    cy.contains('Date De Naissance').next().should('contain', unverifiedAccounts[randomIndex].dateNaissance);
    cy.contains('Formation').next().should('contain', unverifiedAccounts[randomIndex].formation);
    cy.contains('Poste').next().should('contain', unverifiedAccounts[randomIndex].poste);
    cy.contains('Date Obtention Diplome').next().should('contain', unverifiedAccounts[randomIndex].dateObtentionDiplome);
    cy.contains('Date Embauche').next().should('contain', unverifiedAccounts[randomIndex].dateEmbacuhe);
    cy.contains('Valider');
    cy.contains('Refuser');

    cy.intercept('PUT', `http://localhost:3000/etudiant-alumni/refuser/${unverifiedAccounts[randomIndex].EtudiantAluId}`, {
    statusCode: 200,
}).as("validateAccount");

    cy.getByData("refuser").click();
    let indexx = mockData.findIndex((etudiant) => etudiant.EtudiantAluId === unverifiedAccounts[randomIndex].EtudiantAluId);
    cy.wait("@validateAccount").then(() => {
        mockData[indexx].verified=false;
        cy.intercept("GET", "http://localhost:3000/etudiant-alumni/all", {
            statusCode: 200,
            body: mockData,
          }).as("etudiants");
        cy.location('pathname').should('eq', '/getunverified');
    })
    cy.get("[data-test='refused'] tr").first().each(($row) => {
        cy.wrap($row)
        .find("td")
        .eq(0)
        .should("contain.text", mockData[indexx].EtudiantAluId);
    });  
    
    })
    });
