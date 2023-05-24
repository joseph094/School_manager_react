describe("Api Test", () => {
    let saveTask = {};
    let saveTaskUpdated = {};
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzMDAwLCJtZHAiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkWkR4YTdIV1N5L09pWG5UNTV3ckZQQSRaZ05sdVNOMFZoR3AvRm4vL3ZWL1FqN1FteGlPVDdacC9WTUhaTFJxcGpJIiwicm9sZXMiOlsiZW5zZWlnbmFudCJdLCJpYXQiOjE2ODQ2MzYxMDksImV4cCI6MTY4NDYzNzAwOX0.bmF9DDjYJM2MBIW1wNYgVMla7Y_j5-gutdse9ssp_Wc"
    it("GEt Profile by id ", () => {

        cy.request({
            method: "GET",
            url: "http://localhost:3000/etudiant-actuel",
            headers: { 'Authorization': `Bearer ${token}` }
            // url:Cypress.env('urlBackend')+'/auth/login',
        }).then((resp) => {


            expect(resp.status).to.equal(200);

            expect(resp.body.model.EtudiantActId).to.eq(saveTaskUpdated.EtudiantActId);
            expect(resp.body.model.nom).to.eq(saveTaskUpdated.nom);
            expect(resp.body.model.email).to.eq(saveTaskUpdated.email);
            expect(resp.body.model.niveau).to.eq(saveTaskUpdated.niveau);
            expect(resp.body.model.Classe).to.eq(saveTaskUpdated.Classe);
            expect(resp.body.model.dateNaissance).to.eq(saveTaskUpdated.dateNaissance);

        });
    });

    it("should update the profile ", () => {
        const data = {
            EtudiantActId: "22",
            nom: "Farah",
            email:"farah@gmail.com",
            niveau:"2ING",
            Classe:"2ING 01",
            dateNaissance:"1999-06-22"
        };
        console.log("saveTask in update", saveTask);
        cy.request({
            method: "PATCH",
            url: "http://localhost:3000/etudiant-actuel/update/" + saveTask._id,
            body: data,
            // url:Cypress.env('urlBackend')+'/auth/login',
        }).then((resp) => {


            expect(resp.status).to.equal(200);
            console.log("Tasks", resp.body.model);
            expect(resp.body.model.EtudiantActId).to.eq(data.EtudiantActId);
            expect(resp.body.model.nom).to.eq(data.nom);
            expect(resp.body.model.email).to.eq(data.email);
            expect(resp.body.model.niveau).to.eq(data.niveau);
            expect(resp.body.model.Classe).to.eq(data.Classe);
            expect(resp.body.model.dateNaissance).to.eq(data.dateNaissance);
            saveTaskUpdated = resp.body.model;

        });
    });








    let saveCv = {};

it("Mettre à jour un CV", () => {
  const data = {
    idCv: "123456789", // ID du CV à mettre à jour
    bio: "Description du candidat",
    location: "Lieu",
    linkedIn: "https://www.linkedin.com/in/username",
    diplome: ["Diplôme 1", "Diplôme 2"],
    Competences: ["Compétence 1", "Compétence 2"],
    formation: [
      {
        title: "Formation 1",
        emplacement: "Lieu de formation 1",
        startDate: "2020-01-01",
        endDate: "2022-12-31",
        description: "Description de la formation 1"
      },
      {
        title: "Formation 2",
        emplacement: "Lieu de formation 2",
        startDate: "2018-01-01",
        endDate: "2020-12-31",
        description: "Description de la formation 2"
      }
    ],
    experience: [
      {
        title: "Expérience 1",
        emplacement: "Lieu de l'expérience 1",
        startDate: "2016-01-01",
        endDate: "2018-12-31",
        description: "Description de l'expérience 1"
      },
      {
        title: "Expérience 2",
        emplacement: "Lieu de l'expérience 2",
        startDate: "2014-01-01",
        endDate: "2016-12-31",
        description: "Description de l'expérience 2"
      }
    ]
  };

  cy.request({
    method: "PATCH",
    url: "http://localhost:3000/Cv/update/" + saveCv.idCv,
    body: data,
    // url: Cypress.env('urlBackend') + '/auth/login',
  }).then((resp) => {
    expect(resp.status).to.equal(200);
    console.log("CV mis à jour :", resp.body.model);
    expect(resp.body.model.bio).to.eq(data.bio);
    expect(resp.body.model.location).to.eq(data.location);
    expect(resp.body.model.linkedIn).to.eq(data.linkedIn);
    expect(resp.body.model.diplome).to.deep.equal(data.diplome);
    expect(resp.body.model.Competences).to.deep.equal(data.Competences);
    expect(resp.body.model.formation).to.deep.equal(data.formation);
    expect(resp.body.model.experience).to.deep.equal(data.experience);
    saveCv = resp.body.model;
  });
});




});