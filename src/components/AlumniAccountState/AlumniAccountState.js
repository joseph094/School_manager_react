import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import {getEtudiantAlumni, getToken} from '../../api/api';
import styled from "styled-components";
import withAuth from "../../hoc/hoc";




function AlumniAccountState () {
  const [status, setStatus] = useState('');
  const [etudiantAlumni, setEtudiantAlumni] = useState(null);
  const decodedToken = jwt_decode(getToken());
  
  function checkVerificationStatus() {
    if (etudiantAlumni !=null){
      if(etudiantAlumni.verified === false){
        setStatus('Refusé')
      } else if (etudiantAlumni.verified === null)  {
        setStatus('Non Validé')
      } else {
        setStatus('Validé')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEtudiantAlumni(decodedToken.sub);
      setEtudiantAlumni(data);
    };
    fetchData();
  },[]);
  
  useEffect(() => {
    checkVerificationStatus();
  },[etudiantAlumni]);
  
  return (
    <div>
      {etudiantAlumni ? (
        <Container>
        <ProfilePicture src=".\profile.png"></ProfilePicture>
        <NameRow>
          <Prenom data-test="prenom">{etudiantAlumni.prenom}<Nom data-test="nom"> {etudiantAlumni.nom}</Nom></Prenom>
        </NameRow>
        <InformationRow>
          <Title >Email</Title><Value data-test="email">{etudiantAlumni.email}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Date De Naissance</Title><Value data-test="dateNaissance">{etudiantAlumni.dateNaissance}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Formation</Title><Value data-test="formation">{etudiantAlumni.formation}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Poste</Title><Value data-test="poste">{etudiantAlumni.poste}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Date Obtention Diplome</Title><Value data-test="dateObtentionDiplome">{etudiantAlumni.dateObtentionDiplome}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Date Embauche</Title><Value data-test="dateEmbacuhe">{etudiantAlumni.dateEmbacuhe}</Value>
        </InformationRow>
        <AccountStatus>Votre Compte Est <Status status={status} data-test="status">{status}</Status></AccountStatus>
      </Container>
      ) : (
        <Container><Loading>Loading...</Loading> </Container>
        
      )}
    </div>
  );
};

export default withAuth(AlumniAccountState, ["alumni","unverified","refused"]);

export const Nom= styled.span`
font-family: 'montserrat';
font-weight: 800;
color: #4981f5;
font-size: 3rem;
width:fit-content;
margin: 0;
@media (max-width: 460px) {
    font-size: 1.5rem;
  }
`;

export const Prenom= styled.p`
font-family: 'montserrat';
font-weight: 300;
color: black;
font-size: 2.5rem;
width:fit-content;
margin: 0;
@media (max-width: 460px) {
    font-size: 1.6rem;
  }
`;

export const Title= styled.p`
font-family: 'montserrat';
font-weight: 600;
color: black;
font-size: 1.3rem;
width:30%;
margin:0;
@media (max-width: 768px) {
    margin:0;
    width:100%;
}
@media (max-width: 460px) {
    font-size: 1.2rem;
  }

`;

export const Value= styled.p`
font-family: 'montserrat';
font-weight: 300;
color: black;
font-size: 1.2rem;
width:30%;
margin: 0;
@media (max-width: 768px) {
    width:100%;
  }
@media (max-width: 460px) {
  font-size: 1rem;
}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%; 
  margin: 10% auto;
  border-width: 0.5px;
  border-style: solid;
  border-color: rgb(230, 230, 230);
  -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  border-radius: 30px;
  background-color:rgb(255, 255, 255) ;
  padding-block: 20px;
`

export const NameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content:center;
  gap:25px;
  margin-bottom: 5%;
  
`

export const InformationRow = styled.div`
  display: flex;
  flex-direction: row;
  text-align:left;
  align-items:center;
  width: 100%;
  margin-bottom:1.5em;
  justify-content:space-evenly;

  @media (max-width: 768px) {
    flex-direction:column;
    text-align:center;
    margin-bottom:2em;
  }
`

export const AccountStatus= styled.p`
font-family: 'montserrat';
font-weight: 300;
color: black;
font-size: 1.7rem;
width:100%;
text-align: center;
margin: 0;
align-self: center;
margin-top: 3%;
@media (max-width: 768px) {
  font-size: 1.4rem;
  }
@media (max-width: 460px) {
font-size: 1rem;
}
`;

export const Status= styled.span`
font-family: 'montserrat';
font-weight: 800;
color: ${({ status }) => (status === 'Validé' ? 'green' : 'red')};

`;

export const ProfilePicture = styled.img`
 align-self: center;
 width: 15%;
 height: 15%;
 margin-top: -10%;
@media (max-width: 768px) {
  width: 35%;
  margin-top: -15%;
}
`
export const Loading= styled.p`
font-family: 'montserrat';
font-weight: 300;
color: black;
font-size: 1.4vw;
width:100%;
margin: 0;
text-align: center;
animation: 2s breath infinite;
@keyframes breath {
  0%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

`;