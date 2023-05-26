describe("CRUD Publication", () => {
    let token;
    let savedPublication;
  
    beforeEach(() => {
      const data = {
        login: 44456,
        mdp: "salah",
      };
      
      cy.request("POST", "http://localhost:3000/etudiant/auth/signin", data).then((resp) => {
        expect(resp.status).to.eq(201);
        token = resp.body.access_token;
      });
    });

    it("get publications", () => {

      cy.request({
        method: "GET",
        url: `http://localhost:3000/publication`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  
    it("post publication", () => {
      const data = {
        EtudiantAluId:"109",
        contenu:"test api content",
        type: "conseil"
      };
  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/publication/create",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }).then((resp) => {
        expect(resp.status).to.eq(201);
        expect(resp.body.contenu).to.eq(data.contenu);
        expect(resp.body.type).to.eq(data.type);
        savedPublication = resp.body;
      });
    });

    it("get publication", () => {
      cy.request({
        method: "GET",
        url: `http://localhost:3000/publication/${savedPublication.idPublication}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.contenu).to.eq(savedPublication.contenu);
        expect(resp.body.type).to.eq(savedPublication.type);
      });
    });

    it("edit publication", () => {
      const newdata = {
        idPublication : savedPublication.idPublication,
        EtudiantAluId:savedPublication.EtudiantAluId,
        contenu:"test api",
        type: "offre"
      };
  
      cy.request({
        method: "PUT",
        url: "http://localhost:3000/publication",
        body: newdata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.contenu).to.eq(newdata.contenu);
        expect(resp.body.type).to.eq(newdata.type);
        savedPublication = newdata;
      });
    });

    it("delete publication", () => {
      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/publication/${savedPublication.idPublication}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });

  });

  describe("Vacation", () => {
    it("get vacations", () => {
      cy.request({
        method: "GET",
        url: `http://localhost:3000/vacation`,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  
    it("demander vacation", () => {
      const data = {
        EtudiantAluId:"109",
        titre:"test api content",
        description:"test api description",
        competences: ["js","python"]
      };
  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/vacation/create",
        body: data,
      }).then((resp) => {
        expect(resp.status).to.eq(201);
        expect(resp.body.titre).to.eq(data.titre);
        expect(resp.body.description).to.eq(data.description);
      });
    });

  });

  describe("Contrat Expert", () => {
    it("get contrat experts", () => {
      cy.request({
        method: "GET",
        url: `http://localhost:3000/contrat-expert`,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  
    it("demander contrat expert", () => {
      const data = {
        EtudiantAluId:"109",
        titre:"test api content",
        description:"test api description",
        competences: ["js","python"]
      };
  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/contrat-expert/create",
        body: data,
      }).then((resp) => {
        expect(resp.status).to.eq(201);
        expect(resp.body.titre).to.eq(data.titre);
        expect(resp.body.description).to.eq(data.description);
      });
    });

  });