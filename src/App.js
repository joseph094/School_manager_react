import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Router} from 'react-router-dom'
import CreateEvent from "./components/CrudEvents/CreateEvent";
import ListEvents from "./components/CrudEvents/ListEvents";
import UpdateEvent from "./components/CrudEvents/updateEvent";

import CreateTeacher from "./components/CrudEns/CreateEnseig";
import ListEnseignants from "./components/CrudEns/ListEnseignents";
import UpdateEns from "./components/CrudEns/updateEns";
import SignupAlumni from "./components/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/Events' element={<ListEvents />} />
        <Route path='/newEvent' element={<CreateEvent />} />
        <Route path="/Events/:id" element={<UpdateEvent />} />
        <Route path="/signup" element={<SignupAlumni />} />
        <Route path="/enseignants" element={<ListEnseignants />} />
        <Route path="/NewEnseignant" element={<CreateTeacher />} />
        <Route path="/enseignants/:id" element={<UpdateEns />} />
      </Routes>
    </div>
  );
}

export default App;
