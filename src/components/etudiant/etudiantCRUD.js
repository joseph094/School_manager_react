import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  Switch,
} from "react-router-dom";
import GetEtudiant from "./getetudiant";
import EtudiantPUT from "./modifieretudiant";
import EtudiantADD from "./ajoutetudiant";
import Signin from "../signin";

export default function EtudiantCRUD() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ajouteretudiant">Ajout Etudiant</Link>
            </li>
            <li>
              <Link to="/getetudiant">Afficher Etudiant</Link>
            </li>
            <li>
              <Link to="/modifyetudiants">Modifier Etudiants </Link>
            </li>
            <li>
              <Link to="/">Se connecter </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/getetudiant" element={<GetEtudiant />} />
          <Route path="/modifyetudiants" element={<EtudiantPUT />} />
          <Route path="/ajouteretudiant" element={<EtudiantADD />} />
          <Route path="/" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
