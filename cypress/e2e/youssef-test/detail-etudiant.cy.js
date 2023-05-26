describe('GetDetailEtudiant', () => {
    beforeEach(() => {
        cy.loginAdmin()
        cy.visit('http://localhost:3005/detail-etudiant/123') // Assuming the CreateEvent component is rendered at '/create-event' URL
        // Perform login if necessary
        // Set up authentication token in local storage
        // cy.setLocalStorage('token', 'your_auth_token')
    })

    it('Detail Etudiant Actuel Successfuly', () => {
        // Assuming the data is fetched and displayed after an API request
        cy.intercept('GET', 'http://localhost:3000/etudiant-actuel/123', {
            statusCode: 200,
            body: {
                // Mock the etudiant data response here
                EtudiantActId: '123',
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
        }).as('getEtudiant');

        // Wait for the etudiant data to be fetched and displayed
        cy.wait('@getEtudiant');

        // Assertions on the displayed data
        cy.get('[data-test="detail-name"]').should('contain.text', 'John Doe');
        cy.get('[data-test="detail-email"]').should('contain.text', 'Emailjohn.doe@example.com');
        cy.get('[data-test="detail-date-naissance"]').should('contain.text', 'Date De Naissance1990-01-01');
        cy.get('[data-test="detail-formation"]').should('contain.text', 'FormationBachelor Class A');
        cy.get('[data-test="detail-type"]').should('contain.text', 'Etudiant:Actuel');
        cy.get('[data-test="detail-status"]').should('contain.text', 'Son Compte Est Public');
        // ... assert other displayed data based on the etudiant object

        // Optionally, you can also assert the absence of certain elements or data based on the etudiant properties

        // Assertions on the CV data
        cy.get('h1').should('contain.text', 'Curriculum Vitae');
        cy.get('[data-test="detail-experiences"]').should('contain.text', 'Experience:');
        cy.get('[data-test="detail-formations"]').should('contain.text', 'Formation:');
        cy.get('[data-test="detail-competences"]').should('contain.text', 'Competences:');
        // ... assert other CV data based on the etudiant object

        // Assertions on PFE and PFA data
        cy.get('[data-test="detail-pfe-titre"]').should('contain.text', "Projet Fin D'Etudes");
        cy.get('[data-test="detail-pfe-type"]').should('contain.text', "Type:dev web");
        cy.get('[data-test="detail-pfe-sujet"]').should('contain.text', "Sujet:Site e-commerce");
        cy.get('[data-test="detail-pfe-societe"]').should('contain.text', "Societe:Vermag");
        cy.get('[data-test="detail-pfe-pays"]').should('contain.text', "Pays:Tunisie");

        cy.get('[data-test="detail-pfa-titre"]').should('contain.text', "Titre:E-commerce");
        cy.get('[data-test="detail-pfa-desc"]').should('contain.text', "Description:Site de E-commerce pour vendre les produits informatiques");
        cy.get('[data-test="detail-pfa-technologie"]').should('contain.text', "Technologie:Nest and Angular");









        // ... assert other PFE and PFA data based on the etudiant object
    });
    it('Detail Etudiant Alumni Successfuly', () => {
        // Assuming the data is fetched and displayed after an API request
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/123', {
            statusCode: 200,
            body: {
                // Mock the etudiant data response here
                EtudiantAluId: '123',
                prenom: 'John',
                nom: 'Doe',
                email: 'john.doe@example.com',
                dateNaissance: '1990-01-01',
                niveau: 'Bachelor',
                Classe: 'Class A',
                vacation: true,
                formation: "Football",
                dateObtentionDiplome: "25-12-1999",
                visibilite: true,
                societe:"Facebook",
                pays:"France",
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
        cy.wait('@getEtudiant');

        // Assertions on the displayed data
        cy.get('[data-test="detail-name"]').should('contain.text', 'John Doe');
        cy.get('[data-test="detail-email"]').should('contain.text', 'Emailjohn.doe@example.com');
        cy.get('[data-test="detail-date-naissance"]').should('contain.text', 'Date De Naissance1990-01-01');
        cy.get('[data-test="detail-formation"]').should('contain.text', 'FormationBachelor Class A');
        cy.get('[data-test="detail-type"]').should('contain.text', 'Etudiant:Alumni');
        cy.get('[data-test="detail-status"]').should('contain.text', 'Son Compte Est Public');
        cy.get('[data-test="detail-diplome"]').should('contain.text', ' Date Obtention Diplome : 25-12-1999');
        cy.get('[data-test="detail-societe"]').should('contain.text', ' La Societe qui travaille dans  : Facebook ');
        cy.get('[data-test="detail-pays"]').should('contain.text', 'Pays  : France ');




        // ... assert other displayed data based on the etudiant object

        // Optionally, you can also assert the absence of certain elements or data based on the etudiant properties

        // Assertions on the CV data
        cy.get('h1').should('contain.text', 'Curriculum Vitae');
        cy.get('[data-test="detail-experiences"]').should('contain.text', 'Experience:');
        cy.get('[data-test="detail-formations"]').should('contain.text', 'Formation:');
        cy.get('[data-test="detail-competences"]').should('contain.text', 'Competences:');
        // ... assert other CV data based on the etudiant object
        // ... assert other PFE and PFA data based on the etudiant object
    });
});
