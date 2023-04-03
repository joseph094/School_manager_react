import "./App.css";

import InsertStageEte from "./components/etudiant/insertStageEte";
function App() {
  return (
    <Routes>
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
