describe('Crud Publication', () => {
    beforeEach(() => {
            cy.request({
                method: 'DELETE',
                url: 'http://localhost:3000/etudiant-alumni/12345'
            }).then((resp) => {
              expect(resp.status).to.eq(200)
            });
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
    it('Creer/modifier/supprimer/voir une publication', () => {
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
        cy.get("#demo-simple-select").click();
        cy.get('[data-value="etudiant"]').click();
        cy.getByData("valider").click({ force: true });
        cy.location('pathname').should('eq', '/');
        cy.wait("@etudiant");
        cy.visit("/postpublication")

        cy.getByData("contenu").type("contenu de publication");
        cy.get('#demo-simple-select').click();
        cy.get('[data-value="conseil"]').click();
        cy.wait(5000);
        cy.getByData("publier").click();
        cy.location('pathname').should('eq','/mypublications');
        cy.getByData("type").should("contain.text","conseil");
        cy.getByData("nomprenom").should("contain.text","Doe John");
        cy.getByData("contenu").should("contain.text","contenu de publication");
        cy.wait(5000);
        cy.getByData("update").click();
        cy.wait(2000);
        cy.get('#demo-simple-select').click();
        cy.get('[data-value="offre"]').click();
        cy.wait(5000);
        cy.getByData("modifier").click();
        cy.location('pathname').should('eq','/mypublications');
        cy.getByData("type").should("contain.text","offre");
        cy.getByData("nomprenom").should("contain.text","Doe John");
        cy.wait(5000);
        cy.getByData("delete").click();
        cy.wait(5000);
        cy.contains("Vous n'avez aucune publication")
    });
    it('View all publications', () => {
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
        cy.get("#demo-simple-select").click();
        cy.get('[data-value="etudiant"]').click();
        cy.getByData("valider").click({ force: true });
        cy.location('pathname').should('eq', '/');
        cy.wait("@etudiant");
        const publications = [
            {
                contenu: 'Contenu publication 1',
                type: 'conseil',
                EtudiantAluId: "111"
            },
            {
                contenu: 'Contenu publication 2',
                type: 'offre',
                EtudiantAluId: "31"
            },
        ];
        const etudiant = [
            {
                EtudiantAluId: '111',
                nom: 'Tammar',
                prenom: "Salah"
            },
            {
                EtudiantAluId: '31',
                nom: 'Jane',
                prenom: "Doe"
            }
        ];
        cy.intercept('GET', 'http://localhost:3000/publication', publications).as('getPublications');
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/111', etudiant[0]).as('getEtudiantAlumni1');
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/31', etudiant[1]).as('getEtudiantAlumni2');
        cy.visit("/viewpublications");
        cy.wait('@getPublications');
        cy.wait('@getEtudiantAlumni1');
        cy.wait('@getEtudiantAlumni2');
        cy.wait(5000);
        cy.get('[data-test="publication"]').should('have.length', 2);
        publications.map((publication, index) => {
            cy.get('[data-test="publication"]').eq(index).within(() => {
            cy.getByData('nomprenom').should('contain.text', etudiant[index].nom+" "+etudiant[index].prenom);
            cy.getByData('type').should('contain.text', publication.type);
            cy.getByData('contenu').should('contain.text', publication.contenu);
            });
        });
    });
    
});
