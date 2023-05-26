describe('API Crud Event ', () => {
    let EventId;

    beforeEach(() => {
        cy.loginAdmiApi();
    })

    it('Api Get All events', () => {
        cy.request('GET', 'http://localhost:3000/evenement')
            .then((response) => {
                expect(response.status).to.eq(200);
            });
    });

    it('Api Create event', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/evenement/create',
            body: {
                anneuniversitaireName: '2022-2021',
                idEvenement: 'Ori',
                dateEvenement: '2023-06-01',
                description: 'dgjdsjkgljlqlkdv',
                nom: 'Orientation 2021'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('idEvenement');
            EventId = response.body.idEvenement; // Store the created post ID for later use
        });
    });
    it('Api Get Created Event', () => {
        cy.request('GET', `http://localhost:3000/evenement/${EventId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('idEvenement', 'Ori');
                expect(response.body).to.have.property('dateEvenement', '2023-06-01');
                expect(response.body).to.have.property('description', 'dgjdsjkgljlqlkdv');
                expect(response.body).to.have.property('nom', 'Orientation 2021');
            });
    });
    it('Api Update Created Event', () => {
        const updatedDescription = 'Updated description';

        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/evenement`,
            body: {
                idEvenement: EventId,
                description: updatedDescription
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('idEvenement', 'Ori');
            expect(response.body).to.have.property('description', updatedDescription);
            // Add more assertions as needed
        });
    });

    it('Api Delete Created event', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/evenement/${EventId}`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});