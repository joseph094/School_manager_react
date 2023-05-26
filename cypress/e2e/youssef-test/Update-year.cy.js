describe('Update Year Success', () => {
    beforeEach(() => {
        cy.loginEtudiant("123456789", "jalel")

    })

    it('Update Year Successfuly etudiant actuel & etudiant en 3 devient Alumni', () => {
        cy.url().should('eq', 'http://localhost:3005/');
        cy.get('[data-test="modal"]').should('be.visible')
        cy.get('[data-test="redoublante-btn-year"]').click({ force: true });
        cy.url().should('eq', 'http://localhost:3005/');
        cy.get('[data-test="btn-logout"]').click({ force: true });


        cy.url().should('eq', 'http://localhost:3005/signin');
        cy.loginEtudiant("20002000", "ahmed")
        cy.get('[data-test="modal"]').should('be.visible')
        cy.get('.signInput').type('2022-06-12');
        cy.get('[data-test="reussi-btn-year"]').click({ force: true });
        cy.visit('http://localhost:3005/signin');
        cy.loginEtudiant("20002000", "ahmed");
        cy.visit('http://localhost:3005/alumnistatus');
        cy.url().should('eq', 'http://localhost:3005/alumnistatus');














    })
})