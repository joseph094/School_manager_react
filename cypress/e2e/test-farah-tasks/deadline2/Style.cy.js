describe('Style Testing', () => {

  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("24000");
    cy.getByData("mdp").type("etu123");
    cy.get("#demo-simple-select").click(); // Click on the select element
    cy.get('[data-value="etudiant"]').click();
    // Fill in the form inputs with valid data

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit('http://localhost:3005/getCV/22')
  })

  it('should toggle dark mode', () => {
    cy.get('button').contains('Basculer en Mode sombre').click() // Clique sur le bouton pour activer le mode sombre
    cy.get('body').should('have.css', 'background-color', 'rgb(211, 208, 208)') // Vérifie que la couleur d'arrière-plan est bien sombre
    cy.get('h1').should('have.css', 'color', 'rgb(135, 206, 235)') // Vérifie que la couleur du titre est bien orange (rgb(135, 206, 235))
    cy.get('input').should('have.css', 'background-color', 'rgb(255, 255, 255)') // Vérifie que la couleur de fond des champs de saisie est bien blanc (rgb(255, 255, 255))


    cy.get('button').contains('Basculer en Mode clair').click() // Clique sur le bouton pour activer le mode clair
    cy.get('body').should('have.css', 'background-color', 'rgb(211, 208, 208)') // Vérifie que la couleur d'arrière-plan est bien claire
    cy.get('h1').should('have.css', 'color', 'rgb(51, 51, 51)') // Vérifie que la couleur du titre est bien noire (rgb(51, 51, 51))
    cy.get('input').should('have.css', 'background-color', 'rgb(255, 255, 255)') // Vérifie que la couleur de fond des champs de saisie est bien blanc (rgb(255, 255, 255))

  })
})
