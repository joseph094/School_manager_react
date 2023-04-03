import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEvent from "./components/CrudEvents/CreateEvent";
import ListEvents from "./components/CrudEvents/ListEvents";
import UpdateEvent from "./components/CrudEvents/updateEvent";

import CreateTeacher from "./components/CrudEns/CreateEnseig";
import ListEnseignants from "./components/CrudEns/ListEnseignents";
import UpdateEns from "./components/CrudEns/updateEns";
import SignupAlumni from "./components/SignUp/SignUp";

import InsertStageEte from "./components/etudiant/insertStageEte";
function App() {
  return (
    <Routes>
    <Route path='/Events' element={<ListEvents />} />
    <Route path='/newEvent' element={<CreateEvent />} />
    <Route path="/Events/:id" element={<UpdateEvent />} />
    <Route path="/signup" element={<SignupAlumni />} />
    <Route path="/enseignants" element={<ListEnseignants />} />
    <Route path="/NewEnseignant" element={<CreateTeacher />} />
    <Route path="/enseignants/:id" element={<UpdateEns />} />
    <Route path="/getetudiant" element={<GetEtudiant />} />
    <Route path="/modifyetudiants" element={<EtudiantPUT />} />
      <Route path="/ajouteretudiant" element={<EtudiantADD />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/insertstage" element={<InsertStageEte />} />
      <Route path="/insertpfe" element={<InsertPFE />} />
      <Route path="/getalletudiant" element={<GetallEtudiants />} />
  </Routes>
  );
}

export default App;
