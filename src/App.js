import "./App.css";
import { Router, Routes, Route } from 'react-router-dom'
import CreateEvent from "./components/CrudEvents/CreateEvent";
import ListEvents from "./components/CrudEvents/ListEvents";
import UpdateEvent from "./components/CrudEvents/updateEvent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Events' element={<ListEvents />} />
        <Route path='/newEvent' element={<CreateEvent />} />
        <Route path="/Events/:id" element={<UpdateEvent />} />

      </Routes>
    </div>
  );
}

export default App;
