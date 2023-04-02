import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateTeacher from "./components/CrudEns/CreateEnseig";
import ListEnseignants from "./components/CrudEns/ListEnseignents";
import UpdateEns from "./components/CrudEns/updateEns";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/enseignants" element={<ListEnseignants />} />
        <Route path="/NewEnseignant" element={<CreateTeacher />} />
        <Route path="/enseignants/:id" element={<UpdateEns />} />
      </Routes>
    </div>
  );
}

export default App;
