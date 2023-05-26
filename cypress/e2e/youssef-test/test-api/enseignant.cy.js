describe('API Crud Enseignant', () => {
    let EnsId;
    let authToken;

    beforeEach(() => {
        /* cy.loginAdmiApi().then((response) => {
           authToken = response.body.token;
           console.log("auth",authToken);
         });*/
        const signInUser = {
            login: 25023123,
            mdp: "youssef",
        };

        cy.request(
            "POST",
            "http://localhost:3000/admin/auth/signin",
            signInUser
        ).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.access_token).to.exist;
            authToken=response.body.access_token;
        });
    });

    it('Api Get All Enseignant', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/enseignant',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Api Create Enseignant', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/enseignant',
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            body: {
                idEnseignant: "Ens123",
                nom: "Leo",
                prenom: "Messi",
                login: 6666,
                mdp: "inlog",
                email: "messi@gmail.com"
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('idEnseignant');
            EnsId = response.body.idEnseignant; // Store the created post ID for later use
        });
    });

    it('Api Get Created Enseignant', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:3000/enseignant/${EnsId}`,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('idEnseignant', '6666');
            expect(response.body).to.have.property('login', 6666);
            expect(response.body).to.have.property('prenom', 'Messi');
            expect(response.body).to.have.property('nom', 'Leo');
            expect(response.body).to.have.property('mdp', 'inlog');
            expect(response.body).to.have.property('email', 'messi@gmail.com');
        });
    });

    it('Api Delete Created Enseignant', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/enseignant/${EnsId}`,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
