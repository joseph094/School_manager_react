import { wait } from "@testing-library/user-event/dist/utils";

describe('Gerer Droit Access', () => {
    beforeEach(() => {
        cy.loginAdmin()
        cy.visit('http://localhost:3005/gestion-acces') // Assuming the CreateEvent component is rendered at '/create-event' URL
        // Perform login if necessary
        // Set up authentication token in local storage
        // cy.setLocalStorage('token', 'your_auth_token')
    })

    it('Add new Administratif and test Droits successfully', () => {
        // Stub the axios.post request to simulate a successful response
    
        // Fill in the form inputs
        cy.get('input[name="idAdmin"]').type('admin123');
        cy.get('input[name="nom"]').type('John');
        cy.get('input[name="prenom"]').type('Doe');
        cy.get('input[name="login"]').clear().type('12345678');
        cy.get('input[name="mdp"]').type('password');
        cy.get('input[name="email"]').type('admin@example.com');

        // Check specific checkboxes
        cy.get('input[name="ImportExcel"]').check();
        cy.get('input[name="OperationsEtud"]').check();
        cy.get('input[name="OperationsEvent"]').uncheck();
        cy.get('input[name="OperationsEns"]').uncheck();
        cy.get('input[name="OperationsStats"]').uncheck();

        // Click the "Ajouter un Administratif" button
        cy.get('[data-test="btn-add-admin"]').click();

        cy.url().should('eq', 'http://localhost:3005/');

        cy.get('[data-test="btn-logout"]').click({ force: true });

        // cy.visit('http://localhost:3005/signin')

        cy.url().should('eq', 'http://localhost:3005/signin');
        cy.getByData("login").type("12345678");
        cy.getByData("mdp").type("password");
        cy.get("#demo-simple-select").click(); // Click on the select element
        cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"
        cy.getByData("valider").click({ force: true });

        cy.url().should('eq', 'http://localhost:3005/');

        cy.visit("http://localhost:3005/import");
        cy.url().should('eq', 'http://localhost:3005/import');

        cy.visit("http://localhost:3005/getpfeStats");
        cy.url().should('eq', 'http://localhost:3005/unauthorized');

        cy.visit("http://localhost:3005/");


        cy.get('[data-test="btn-logout"]').click({ force: true });

        // cy.visit('http://localhost:3005/signin')

        cy.url().should('eq', 'http://localhost:3005/signin');

        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/admin/admin123`,
            auth: {
              bearer: window.localStorage.getItem('token'), // Retrieve the authentication token
            },
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.equal(200);
          });



        // Wait for the createAdmin request to complete
       /* cy.wait('@createAdmin').then((interception) => {
            // Assert that the request was made with the correct data
            expect(interception.request.body).to.eql({
                idAdmin: 'admin123',
                prenom: 'Doe',
                nom: 'John',
                login: 12345678,
                mdp: 'password',
                email: 'admin@example.com',
                OperationsEtud: true,
                ImportExcel: true,
                OperationsEvent: false,
                OperationsEns: false,
                OperationsDemande: true,
                OperationsStats: false,
            });

            // Assert that the user is navigated to the specified route ("/")
            cy.url().should('eq', 'http://localhost:3005/');

            cy.get('[data-test="btn-logout"]').click({ force: true });

            // cy.visit('http://localhost:3005/signin')

            cy.url().should('eq', 'http://localhost:3005/signin');
            cy.getByData("login").type("12345678");
            cy.getByData("mdp").type("password");
            cy.get("#demo-simple-select").click(); // Click on the select element
            cy.get('[data-value="admin"]').click(); // Click on the MenuItem with a value of "admin"
            cy.getByData("valider").click({ force: true });

            cy.url().should('eq', 'http://localhost:3005/');




            // Assert any other expectations based on the response or behavior after creating an admin
            // ...

            // You can also assert the response using cy.get('@createAdmin')
        });*/
    });
});