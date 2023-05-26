describe('API Crud Event ', () => {
    let AdminId;

    beforeEach(() => {
        cy.loginAdmiApi();
    })

    it('Api Create Administratif', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/admin',
            body: {
                idAdmin: "admin123",
                nom: "Cristiano",
                prenom: "Ronaldo",
                login: 7777,
                mdp: "ronaldo",
                email: "ronaldo@email.com",
                OperationsEtud: true,
                ImportExcel: true,
                OperationsEvent: false,
                OperationsEns: false,
                OperationsDemande: true,
                OperationsStats: false,
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('idAdmin');
            AdminId = response.body.idAdmin; // Store the created post ID for later use
        });
    });
    it('Api Get Created Administratif then Deleting It', () => {
        cy.request('GET', `http://localhost:3000/admin/${AdminId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('idAdmin', 'admin123');
                expect(response.body).to.have.property('nom', 'Cristiano');
                expect(response.body).to.have.property('prenom', 'Ronaldo');
                expect(response.body).to.have.property('login', 7777);
                expect(response.body).to.have.property('mdp', 'ronaldo');
                expect(response.body).to.have.property('OperationsEtud', true);
                expect(response.body).to.have.property('ImportExcel', true);
                expect(response.body).to.have.property('OperationsEvent', false);
                expect(response.body).to.have.property('OperationsEns', false);
                expect(response.body).to.have.property('OperationsStats', false);
                expect(response.body).to.have.property('OperationsDemande', true);


            });
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/admin/admin123`,
            auth: {
                bearer: window.localStorage.getItem('token'), // Retrieve the authentication token
            },
        }).then((deleteResponse) => {
            expect(deleteResponse.status).to.equal(200);
        });
    });



})