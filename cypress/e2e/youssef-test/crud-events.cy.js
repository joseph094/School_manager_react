describe('CrudEvenement', () => {
    beforeEach(() => {
        cy.loginAdmin()
        cy.visit('http://localhost:3005/newEvent') // Assuming the CreateEvent component is rendered at '/create-event' URL
        // Perform login if necessary
        // Set up authentication token in local storage
        // cy.setLocalStorage('token', 'your_auth_token')
    })

    it('Adds a new event', () => {

        cy.get('[data-test="event-ref"]').type('123') // Enter event reference
        cy.get('[data-test="event-name"]').type('My Event') // Enter event name
        cy.get('[data-test="event-anne"]').type('2022-2023') // Enter event anne universitaire
        cy.get('[data-test="event-date"]').type('2023-05-18') // Enter event date
        cy.get('[data-test="event-desc"]').type('This is a test event') // Enter event description
        cy.get('[data-test="btn-create-event"]').click() // Click on the create event button

        // Assert that the event is created successfully

        const mockData = [
            {
                idEvenement: "123",
                anneuniversitaire: "2022-2023",
                nom: "Doe",
                description: "This is a test event",
                dateEvenement: "2023-05-18",
            },
            {
                idEvenement: "1234",
                anneuniversitaire: "2022-2023",
                nom: "Doe",
                description: "This is a test event",
                dateEvenement: "2023-05-18",
            },
        ];
        cy.intercept("GET", "http://localhost:3000/evenement", {
            statusCode: 200,
            body: mockData,
        }).as("evenemnts");

        cy.location("pathname").should("eq", "/Events");

        cy.wait("@evenemnts")
        // get the table rows
        cy.get("table tbody tr").as("tableRows");

        // verify that there are two rows displayed
        cy.get("@tableRows").should("have.length", 2);

        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("123");
                cy.contains("Doe");
                cy.contains("2023-05-18");
                cy.contains("This is a test event");

            });

        // verify that the second row displays the correct data
        cy.get("@tableRows")
            .eq(1)
            .within(() => {
                cy.contains("1234");
                cy.contains("Doe");
                cy.contains("2023-05-18");
                cy.contains("This is a test event");
            });
        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("edit").click();
            });

        // Assert that the URL contains the correct path for editing the event
        cy.url().should("include", "/Events/123");
        cy.location("pathname").should("eq", "/Events/123");
        cy.get('[data-test="event-update-name"]').clear().type('My Updated Event') // Enter event name
        cy.get('[data-test="event-update-date"]').clear().type('2023-02-18') // Enter event date
        cy.get('[data-test="event-update-desc"]').clear().type('This new updated event') // Enter event description
        cy.get('[data-test="btn-update-event"]').click()

        const mock = [
            {
                idEvenement: "123",
                anneuniversitaire: "2022-2023",
                nom: "My Updated Event",
                description: "This new updated event",
                dateEvenement: "2023-02-18",
            },
            {
                idEvenement: "1234",
                anneuniversitaire: "2022-2023",
                nom: "Doe",
                description: "This is a test event",
                dateEvenement: "2023-05-18",
            },
        ];
        cy.intercept("GET", "http://localhost:3000/evenement", {
            statusCode: 200,
            body: mock,
        }).as("evenemnts");

        cy.location("pathname").should("eq", "/Events");

        cy.wait("@evenemnts")
        // get the table rows
        cy.get("table tbody tr").as("tableRows");

        // verify that there are two rows displayed
        cy.get("@tableRows").should("have.length", 2);

        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("123");
                cy.contains("My Updated Event");
                cy.contains("2023-02-18");
                cy.contains("This new updated event");
            });

        // verify that the second row displays the correct data
        cy.get("@tableRows")
            .eq(1)
            .within(() => {
                cy.contains("1234");
                cy.contains("Doe");
                cy.contains("2023-05-18");
                cy.contains("This is a test event");
            });

        cy.get("@tableRows")
            .eq(0)
            .within(() => {
                cy.contains("delete").click();
            });




    })

})
