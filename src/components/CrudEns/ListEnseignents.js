import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./listeEns.css";

function ListEnseignants() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.idEnseignant !== id));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/enseignant", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Getting", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const DeleteEvent = (id) => {
    axios
      .delete(`http://localhost:3000/enseignant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        (res) => console.log("this is the Delete method", res),
        handleDelete(id)
      )
      .catch((err) => console.log(err));
  };

  const arr = data.map((i) => {
    return (
      <tr>
        <td className="theRest">{i.idEnseignant}</td>
        <td className="theRest">{i.nom}</td>
        <td className="theRest">{i.prenom}</td>
        <td className="theRest">{i.login}</td>
        <td className="theRest">{i.mdp}</td>
        <td className="theRest">{i.email}</td>
        <td>
          <Button
            onClick={() =>
              navigate(`/enseignants/${i.idEnseignant}`, { replace: true })
            }
          >
            edit
          </Button>
        </td>
        <td>
          <Button onClick={() => DeleteEvent(i.idEnseignant)}>delete</Button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <div className="container">
        <h2>La Liste des Enseignants </h2>
        <div style={{ margin: "4rem", marginTop: "3rem" }}>
          <table className="custom-table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="theHead">Id Enseignant</th>
                <th className="theHead">Nom</th>
                <th className="theHead">Prenom</th>
                <th className="theHead">Login</th>
                <th className="theHead">Mot De Passe</th>
                <th className="theHead">Email</th>
                <th className="theHead"></th>
                <th className="theHead"></th>
              </tr>
            </thead>
            <tbody>{arr}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListEnseignants;
