import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEvent from "./components/CrudEvents/CreateEvent";
import ListEvents from "./components/CrudEvents/ListEvents";
import UpdateEvent from "./components/CrudEvents/updateEvent";

import CreateTeacher from "./components/CrudEns/CreateEnseig";
import ListEnseignants from "./components/CrudEns/ListEnseignents";
import UpdateEns from "./components/CrudEns/updateEns";
import SignupAlumni from "./components/SignUp/SignUp";
import styled from "styled-components";
import InsertStageEte from "./components/etudiant/insertStageEte";
import GetEtudiant from "./components/etudiant/getetudiant";
import Signin from "./components/signin";
import InsertPFE from "./components/etudiant/insertPFE";
import GetallEtudiants from "./components/etudiant/getallEtudiants";
import EtudiantADD from "./components/etudiant/ajoutetudiant";
import EtudiantPUT from "./components/etudiant/modifieretudiant";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import AlumniAccountState from "./components/AlumniAccountState/AlumniAccountState";
import GetUnverifiedAlumniAccounts from "./components/ValidateAlumniAccount/GetUnverifiedAlumniAccounts";
import VerifyAlumniAccount from "./components/ValidateAlumniAccount/VerifyAlumniAccount";
import SideBar from "./components/SideBar/SideBar";
function App() {
  return (
    <>
    <Container>
      <LeftSide>
        <SideBar/>
      </LeftSide>
      <RightSide>
        <Routes>
          <Route path="/Events" element={<ListEvents />} />
          <Route path="/newEvent" element={<CreateEvent />} />
          <Route path="/Events/:id" element={<UpdateEvent />} />
          <Route path="/signup" element={<SignupAlumni />} />
          <Route path="/enseignants" element={<ListEnseignants />} />
          <Route path="/NewEnseignant" element={<CreateTeacher />} />
          <Route path="/enseignants/:id" element={<UpdateEns />} />
          <Route path="/getetudiant" element={<GetEtudiant />} />
          <Route path="/modifyetudiants" element={<EtudiantPUT />} />
          <Route path="/ajouteretudiant" element={<EtudiantADD />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/alumnistatus" element={<AlumniAccountState />} />
          <Route path="/getunverified" element={<GetUnverifiedAlumniAccounts />} />
          <Route path="/valider/:id" element={<VerifyAlumniAccount />} />
          <Route path="/passreset" element={<UpdatePassword />} />
          <Route path="/insertstage" element={<InsertStageEte />} />
          <Route path="/insertpfe" element={<InsertPFE />} />
          <Route path="/getalletudiant" element={<GetallEtudiants />} />
        </Routes>
      </RightSide>
    </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
transition: all ease-in .3s;
height:100vh;
`;

const RightSide = styled.div`
width:100%;
max-height:100%;
`;