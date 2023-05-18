describe('Voir Demandes', () => {
    beforeEach(() => {
        cy.visit("/signin")
            cy.getByData("login").type("115");
            cy.getByData("mdp").type("admin");
            cy.get("#demo-simple-select").click(); // Click on the select element
            cy.get('[data-value="admin"]').click();
            cy.getByData("valider").click({ force: true });
    });
    it('Voir Demandes Vacation', () => {
        cy.location('pathname').should('eq', '/');
        const vacations = [
            {
                titre: 'Vacation 1',
                description: 'Description 1',
                EtudiantAluId: "111"
            },
            {
                titre: 'Vacation 2',
                description: 'Description 2',
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
        cy.intercept('GET', 'http://localhost:3000/vacation', vacations).as('getVacations');
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/111', etudiant[0]).as('getEtudiantAlumni1');
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/31', etudiant[1]).as('getEtudiantAlumni2');
        cy.visit("/vacations");
        cy.wait('@getVacations');
        cy.wait('@getEtudiantAlumni1');
        cy.wait('@getEtudiantAlumni2');
        cy.wait(5000);
        cy.get('[data-test="vacation"]').should('have.length', 2);
        vacations.map((vacation, index) => {
              cy.get('[data-test="vacation"]').eq(index).within(() => {
                cy.get('h2').should('have.text', `Demande n° ${index + 1}`);
                cy.getByData('nomprenom').should('contain.text', etudiant[index].nom+" "+etudiant[index].prenom);
                cy.getByData('titre').should('contain.text', vacation.titre);
                cy.getByData('description').should('contain.text', vacation.description);
                cy.get('button').should('contain.text', 'Voir CV');
              });
        });
        
    });
    it('Voir Demandes Contrat', () => {
        cy.location('pathname').should('eq', '/');
        const contrats = [
            {
                titre: 'Vacation 1',
                description: 'Description 1',
                EtudiantAluId: "111"
            },
            {
                titre: 'Vacation 2',
                description: 'Description 2',
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
        cy.intercept('GET', 'http://localhost:3000/contrat-expert', contrats).as('getContrat');
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/111', etudiant[0]).as('getEtudiantAlumni1');
        cy.intercept('GET', 'http://localhost:3000/etudiant-alumni/31', etudiant[1]).as('getEtudiantAlumni2');
        cy.visit("/contrats");
        cy.wait('@getContrat');
        cy.wait('@getEtudiantAlumni1');
        cy.wait('@getEtudiantAlumni2');
        cy.wait(5000);
        cy.get('[data-test="contrat"]').should('have.length', 2);
        contrats.map((contrat, index) => {
              cy.get('[data-test="contrat"]').eq(index).within(() => {
                cy.get('h2').should('have.text', `Demande n° ${index + 1}`);
                cy.getByData('nomprenom').should('contain.text', etudiant[index].nom+" "+etudiant[index].prenom);
                cy.getByData('titre').should('contain.text', contrat.titre);
                cy.getByData('description').should('contain.text', contrat.description);
                cy.get('button').should('contain.text', 'Voir CV');
              });
        });
        
    });
});
