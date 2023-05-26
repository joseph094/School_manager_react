
describe('Import Wrong File', () => {
  beforeEach(() => {
    cy.loginAdmin()
    cy.visit('http://localhost:3005/import') // Assuming the CreateEvent component is rendered at '/create-event' URL
    // Perform login if necessary
    // Set up authentication token in local storage
    // cy.setLocalStorage('token', 'your_auth_token')
  })

  it('uploads Wrong Type File', () => {
    // Visit the page with the Excel component

    // Stub the file upload request
    cy.fixture('wrong-file.txt').then((fileContent) => {
      cy.get('input[type=file]').selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'wrong-file.txt',
        lastModified: Date.now(),
      });
    });


    // Verify error message is displayed
    cy.contains('Only CSV or XLSX files are allowed').should('be.visible');

 
  
   });


  // Click the submit button

  // Assert that the file upload request was successful


  // Assert any other post-upload behavior if necessary
  // ...
});