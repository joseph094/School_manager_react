import "./App.css";
import EtudiantADD from "./components/ajoutetudiant";
import EtudiantPUT from "./components/modifieretudiant";
import Signin from "./components/signin";
import GetEtudiant from "./components/getetudiant";
import EtudiantCRUD from "./components/etudiantCRUD";
function App() {
  // return <EtudiantADD />;
  // return <Signin />;
  // return <EtudiantPUT />;
  return <EtudiantCRUD />;
}

export default App;
