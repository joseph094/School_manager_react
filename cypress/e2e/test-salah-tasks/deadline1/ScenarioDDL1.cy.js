describe('Signup Alumni Voir son etat Et changer Mot De passe', () => {
        beforeEach(() => {
            cy.request({
              method: 'DELETE',
              url: 'http://localhost:3000/etudiant-alumni/12345'
            }).then((resp) => {
                // redirect status code is 302
                expect(resp.status).to.eq(200)})
        });
    it('DDL 1 Scenario', () => {
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
        
    
        // Submit the form
        cy.get('[data-test="submit"]').click();
    
        // Assert that the user is redirected to the signin page
        cy.location('pathname').should('eq', '/signin');
        cy.getByData("login").type("12345");
        cy.getByData("mdp").type("password");
        cy.get("#demo-simple-select").click(); // Click on the select element
        cy.get('[data-value="etudiant"]').click();
        cy.getByData("valider").click({ force: true });
        cy.location('pathname').should('eq', '/');

        cy.visit("http://localhost:3005/alumnistatus");
        cy.wait(5000);
        cy.getByData('nom').should('contain','Doe');
        cy.getByData('prenom').should('contain','John');
        cy.getByData('dateNaissance').should('contain','1990-01-01');
        cy.getByData('formation').should('contain','Computer Science');
        cy.getByData('poste').should('contain','Software Engineer');
        cy.getByData('email').should('contain','john.doe@example.com');
        cy.getByData('dateObtentionDiplome').should('contain','2020-01-01');
        cy.getByData('dateEmbacuhe').should('contain','2021-01-01');
        cy.getByData('status').should('contain','Non Validé');
        cy.visit('/passreset');
        cy.get('#old-password').type('fakepass');
        cy.get('#new-password').type('newfakepass');
        cy.get('#confirm-new-password').type('newfakepass');
        cy.getByData('changer').click(); 
        cy.wait(5000)
        cy.intercept('PUT', `/etudiant`, {
            statusCode: 200,
            body:{
                id:12345,
                oldmdp:"fakepass",
                mdp:"newfakepass"
            }
        }); 
        cy.getByData('changer').click(); 
        cy.get('.success').should('contain', 'Mot de passe modifier avec succes');
        })
  });