describe('CrudEvenement', () => {
    beforeEach(() => {
        cy.loginAdmin()
        cy.visit('http://localhost:3005/newEvent') // Assuming the CreateEvent component is rendered at '/create-event' URL
        // Perform login if necessary
        // Set up authentication token in local storage
        // cy.setLocalStorage('token', 'your_auth_token')
    })

    it("displays responsive design", () => {
        cy.viewport("macbook-11");
        cy.get(".contact1-pic").should("be.visible");
        cy.get(".contact1-form").should("be.visible");
        // Check if the charts are responsive
        cy.viewport("ipad-2");
        cy.get(".contact1-pic").should("not.be.visible");
        cy.get(".contact1-form").should("be.visible");
       
    });
}) 	