describe('CrudEnseignant', () => {
    beforeEach(() => {
        cy.loginAdmin()
        cy.visit('http://localhost:3005/NewEnseignant') // Assuming the CreateEvent component is rendered at '/create-event' URL
        // Perform login if necessary
        // Set up authentication token in local storage
        // cy.setLocalStorage('token', 'your_auth_token')
    })

    it('Adds a new event', () => {

        cy.get('[data-test="ens-ref"]').type('123') // Enter event reference
        cy.get('[data-test="ens-nom"]').type('Joe') // Enter event name
        cy.get('[data-test="ens-prenom"]').type('Ksi') // Enter event anne universitaire
        cy.get('[data-test="ens-login"]').type('15001500') // Enter event date
        cy.get('[data-test="ens-mdp"]').type('15001500')
        cy.get('[data-test="ens-mail"]').type('Ksi@gmail.com') // Enter event description
        cy.get('[data-test="btn-create-ens"]').click() // Click on the create event button

        // Assert that the event is created successfully

        const mockData = [
            {
                idEnseignant: "15001500",
                nom: "Joe",
                prenom: "Ksi",
                login: "15001500",
                mdp: "15001500",
                email: "Ksi@gmail.com"
            },
            {
                idEnseignant: "12345",
                nom: "Joe",
                prenom: "Ksi",
                login: "15001150015",
                mdp: "15001500",
                email: "KsiJoe@gmail.com"
            },
        ];
        cy.intercept("GET", "http://localhost:3000/enseignant", {
            statusCode: 200,
            body: mockData,
        }).as("enseignants");

        cy.location("pathname").should("eq", "/enseignants");

        cy.wait("@enseignants")
        // get the table rows
        cy.get("table tbody tr").as("tableRows");

        // verify that there are two rows displayed
        cy.get("@tableRows").should("have.length", 2);

        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("15001500");
                cy.contains("Joe");
                cy.contains("Ksi");
                cy.contains("15001500");
                cy.contains("*********");
                cy.contains("Ksi@gmail.com");
            });

        // verify that the second row displays the correct data
        cy.get("@tableRows")
            .eq(1)
            .within(() => {
                cy.contains("12345");
                cy.contains("Joe");
                cy.contains("Ksi");
                cy.contains("15001150015");
                cy.contains("*********");
                cy.contains("KsiJoe@gmail.com");


            });
        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("edit").click();
            });

        // Assert that the URL contains the correct path for editing the event
        cy.url().should("include", "/enseignants/15001500");
        cy.location("pathname").should("eq", "/enseignants/15001500");
        cy.get('[data-test="ens-update-nom"]').clear().type('Joe') // Enter event name
        cy.get('[data-test="ens-update-prenom"]').clear().type('Fournier') // Enter event name
        cy.get('[data-test="ens-update-email"]').clear().type('KsiFournier@gmail.com') // Enter event name
        cy.get('[data-test="btn-update-ens"]').click()


        const mocking = [
            {
                idEnseignant: "15001500",
                nom: "Joe",
                prenom: "Fournier",
                login: "15001500",
                mdp: "15001500",
                email: "KsiFournier@gmail.com"
            },
            {
                idEnseignant: "12345",
                nom: "Joe",
                prenom: "Ksi",
                login: "15001150015",
                mdp: "15001500",
                email: "KsiJoe@gmail.com"
            },
        ];
        cy.intercept("GET", "http://localhost:3000/enseignant", {
            statusCode: 200,
            body: mocking
        }).as("ens");

        cy.location("pathname").should("eq", "/enseignants");
        cy.wait(500);
        cy.wait("@ens");


        // get the table rows
        cy.get("table tbody tr").as("tableRows");

        // verify that there are two rows displayed
        cy.get("@tableRows").should("have.length", 2);

        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("15001500");
                cy.contains("Joe");
                cy.contains("Fournier");
                cy.contains("15001500");
                cy.contains("*********");
                cy.contains("KsiFournier@gmail.com");
            });

        // verify that the second row displays the correct data
        cy.get("@tableRows")
            .eq(1)
            .within(() => {
                cy.contains("12345");
                cy.contains("Joe");
                cy.contains("Ksi");
                cy.contains("15001150015");
                cy.contains("*********");
                cy.contains("KsiJoe@gmail.com");


            });

        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("delete").click();
            });




    })

})
