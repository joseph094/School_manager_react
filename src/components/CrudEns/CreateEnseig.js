import axios from "axios";
import React, { useState } from "react";
import "./CreateEns.css";
import withAuth from "../../hoc/hoc";
import { useNavigate } from "react-router-dom";

function CreateTeacher() {
  const token = localStorage.getItem("token");

  const [idEnseignant, setIdEns] = useState("");
  const [NomEns, setNomEns] = useState("");
  const [PrenomEns, setPrenomEns] = useState("");
  const [login, setLogin] = useState("");
  const [mdp, setMdp] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const AddEns = (e) => {
    axios
      .post(
        "http://localhost:3000/enseignant",
        {
          idEnseignant: idEnseignant,
          nom: NomEns,
          prenom: PrenomEns,
          login: login,
          mdp: mdp,
          email: Email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => console.log("this is the post method", res),
        navigate(`/enseignants`, { replace: true })
      )
      .catch((err) => console.log(err));
  };
  return (
    <div className="contact1">
      <div className="container-contact1">
        <div className="contact1-pic js-tilt" data-tilt>
          <img src="/teachers.png" alt="IMG" />
        </div>

        <div className="contact1-form">
          <span className="contact1-form-title">Ajouter Enseignant</span>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseignant ID"
              value={idEnseignant}
              data-test="ens-ref"
              onChange={(e) => setIdEns(e.target.value)}
            />
          </div>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseingnant Name"
              value={NomEns}
              data-test="ens-nom"
              onChange={(e) => setNomEns(e.target.value)}
            />
          </div>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Ens Last Name"
              value={PrenomEns}
              data-test="ens-prenom"
              onChange={(e) => setPrenomEns(e.target.value)}
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Ens Login"
              value={login}
              data-test="ens-login"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Password"
              value={mdp}
              data-test="ens-mdp"
              onChange={(e) => setMdp(e.target.value)}
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Email"
              value={Email}
              data-test="ens-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="container-contact1-form-btn">
            <button data-test="btn-create-ens" className="contact1-form-btn" onClick={AddEns}>
              <span>Ajouter Enseignant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(CreateTeacher, ["admin", "DroitEns"]);
