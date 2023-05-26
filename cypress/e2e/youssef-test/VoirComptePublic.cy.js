describe('Voir public accounts', () => {
    beforeEach(() => {
        cy.loginEtudiant("12341234", "jalel")
        cy.visit('http://localhost:3005/make-public')

    })

    it('Should display the list of public accounts', () => {

        cy.intercept('GET', 'http://localhost:3000/etudiant-actuel/etud6', {
            statusCode: 200,
            body: {
                // Mock the etudiant data response here
                EtudiantActId: 'etud6',
                prenom: 'John',
                nom: 'Doe',
                email: 'john.doe@example.com',
                dateNaissance: '1990-01-01',
                niveau: 'Bachelor',
                Classe: '1',
                vacation: null,
                formation: "Football",
                dateObtentionDiplome: null,
                visibilite: false,
                cv: {
                    idCv: "cv123",
                    formation: ["license", "ingenieurie"],
                    Competences: ["nest", "Angular"],
                    experience: ["not yet"]
                },
                pfe: {
                    idpfe: "etudMpfe",
                    type: "dev web",
                    societe: "Vermag ",
                    pays: "Tunisie",
                    sujet: "Site e-commerce",
                    idEnseignant: "100"
                },
                pfa: {
                    idPfa: "1010",
                    titre: "E-commerce",
                    description: "Site de E-commerce pour vendre les produits informatiques",
                    technologie: "Nest and Angular",
                    nbEtudiants: 1,
                    idEtudiant: []

                }

            },
        }).as('getEtudiant');

        // Wait for the etudiant data to be fetched and displayed

        cy.wait('@getEtudiant').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            let etudiant = interception.response.body;
            cy.get('[data-test="account-name"]').should('contain.text', etudiant.prenom + " " + etudiant.nom);
            cy.get('[data-test="account-email"]').should('contain.text', 'Emailjohn.doe@example.com');
            cy.get('[data-test="account-date-naissance"]').should('contain.text', 'Date De Naissance1990-01-01');
            cy.get('[data-test="account-status"]').should('contain.text', etudiant.visibilite !== true ? 'Private' : 'Public');
            cy.get('[data-test="account-change-btn"]').should('contain.text', etudiant.visibilite !== true ? 'Make it Public' : 'Make it Private');
            cy.get('[data-test="account-change-btn"]').click().then(() => {
                //etudiant.visibilite = !etudiant.visibilite;
                cy.url().should('eq', 'http://localhost:3005/make-public');
                cy.intercept('GET', 'http://localhost:3000/etudiant-actuel/etud6', {
                    statusCode: 200,
                    body: {
                        // Mock the etudiant data response here
                        EtudiantActId: 'etud6',
                        prenom: 'John',
                        nom: 'Doe',
                        email: 'john.doe@example.com',
                        dateNaissance: '1990-01-01',
                        niveau: 'Bachelor',
                        Classe: 'Class A',
                        vacation: null,
                        formation: "Football",
                        dateObtentionDiplome: null,
                        visibilite: true,
                        cv: {
                            idCv: "cv123",
                            formation: ["license", "ingenieurie"],
                            Competences: ["nest", "Angular"],
                            experience: ["not yet"]
                        },
                        pfe: {
                            idpfe: "etudMpfe",
                            type: "dev web",
                            societe: "Vermag ",
                            pays: "Tunisie",
                            sujet: "Site e-commerce",
                            idEnseignant: "100"
                        },
                        pfa: {
                            idPfa: "1010",
                            titre: "E-commerce",
                            description: "Site de E-commerce pour vendre les produits informatiques",
                            technologie: "Nest and Angular",
                            nbEtudiants: 1,
                            idEtudiant: []

                        }

                    },
                }).as('getEtudiantafterUpadte');
                cy.wait('@getEtudiantafterUpadte').then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                    let etudiant = interception.response.body;
                    console.log("etudiant change", etudiant.visibilite);
                    cy.get('[data-test="account-status"]').should('contain.text', etudiant.visibilite !== true ? 'Private' : 'Public');
                    cy.get('[data-test="account-change-btn"]').should('contain.text', etudiant.visibilite !== true ? 'Make it Public' : 'Make it Private');
                });
            });
        })
        cy.get('[data-test="btn-logout"]').click({ force: true });
        cy.visit('http://localhost:3005/signin')



        cy.url().should('eq', 'http://localhost:3005/signin');
        cy.loginEtudiant("123456789", "jalel")
        cy.visit('http://localhost:3005/publicaccounts')

        // Mock the API response
        cy.intercept('GET', 'http://localhost:3000/etudiant/all', {
            statusCode: 200,
            body: [
                {
                    // Mock the etudiant data response here
                    EtudiantAluId: 'etud6',
                    prenom: 'John',
                    nom: 'Doe',
                    email: 'john.doeyoussef@example.com',
                    dateNaissance: '1990-01-01',
                    niveau: 'Bachelor',
                    Classe: 'Class A',
                    vacation: true,
                    formation: "Football",
                    dateObtentionDiplome: "25-12-1999",
                    visibilite: true,
                    societe: "Facebook",
                    pays: "France",
                    cv: {
                        idCv: "cv123",
                        formation: ["license", "ingenieurie"],
                        Competences: ["nest", "Angular"],
                        experience: ["not yet"]
                    },
                    pfe: {
                        idpfe: "etudMpfe",
                        type: "dev web",
                        societe: "Vermag ",
                        pays: "Tunisie",
                        sujet: "Site e-commerce",
                        idEnseignant: "100"
                    },
                    pfa: {
                        idPfa: "1010",
                        titre: "E-commerce",
                        description: "Site de E-commerce pour vendre les produits informatiques",
                        technologie: "Nest and Angular",
                        nbEtudiants: 1,
                        idEtudiant: []

                    }

                }, {
                    // Mock the etudiant data response here
                    EtudiantActId: 'etud6',
                    prenom: 'John',
                    nom: 'Doe',
                    email: 'john.doemaroune@example.com',
                    dateNaissance: '1990-01-01',
                    niveau: 'Bachelor',
                    Classe: '1',
                    vacation: null,
                    formation: "Football",
                    dateObtentionDiplome: null,
                    visibilite: false,
                    cv: {
                        idCv: "cv123",
                        formation: ["license", "ingenieurie"],
                        Competences: ["nest", "Angular"],
                        experience: ["not yet"]
                    },
                    pfe: {
                        idpfe: "etudMpfe",
                        type: "dev web",
                        societe: "Vermag ",
                        pays: "Tunisie",
                        sujet: "Site e-commerce",
                        idEnseignant: "100"
                    },
                    pfa: {
                        idPfa: "1010",
                        titre: "E-commerce",
                        description: "Site de E-commerce pour vendre les produits informatiques",
                        technologie: "Nest and Angular",
                        nbEtudiants: 1,
                        idEtudiant: []

                    }

                }
            ]


        }).as('getStudents');

        // Perform the necessary actions to navigate to the list of public accounts
        cy.get("table tbody tr").as("tableRows");
        // Wait for the API request to complete and verify the response
        cy.wait('@getStudents').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            const etudiants = interception.response.body;
            console.log(etudiants, "2nd");

            cy.get("@tableRows").should("have.length", 1);

            cy.get("@tableRows")
                .eq(0)
                .within(() => {
                    cy.contains(etudiants[0].nom);
                    cy.contains(etudiants[0].prenom);
                    cy.contains(etudiants[0].email);
                    cy.contains(etudiants[0].dateNaissance);
                    cy.contains(etudiants[0].vacation !== null ? 'Alumni' : 'Actuel');
                    cy.get('[data-test="public-account-cv"]').click();

                })
            
            cy.location("pathname").should("eq", "/consult-cv/etud6");

        });
    });
});
