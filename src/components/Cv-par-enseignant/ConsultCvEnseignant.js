import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getEtudiantAlumni, getToken, getEudiantActuel } from '../../api/api';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import withAuth from "../../hoc/hoc";



function GetCvParEns() {
    const [etudiant, setEtudiant] = useState(null);
    const decodedToken = jwt_decode(getToken());
    const { id } = useParams();



    useEffect(() => {
        const fetchData = async () => {


            const data = await getEtudiantAlumni(id);
            // console.log(data==="")


            if (data === "") {
                //console.log("data",data)
                const data = await getEudiantActuel(id);
                setEtudiant(data);
            } else {
                setEtudiant(data);
            }
            console.log(data);

        };
        fetchData();
        ;
    }, []);

    return (
        <div>
            <div>
                {etudiant ?
                    <Container>
                        <ProfilePicture src={process.env.PUBLIC_URL + '/profile.png'}></ProfilePicture>
                        <NameRow>
                            <Prenom>{etudiant.prenom}<Nom> {etudiant.nom}</Nom></Prenom>
                        </NameRow>
                        <InformationRow>
                            <Title>Email</Title><Value>{etudiant.email}</Value>
                        </InformationRow>
                        <InformationRow>
                            <Title>Date De Naissance</Title><Value>{etudiant.dateNaissance}</Value>
                        </InformationRow>
                        <InformationRow>
                            <Title>Formation</Title><Value>{etudiant.niveau} {etudiant.Classe}</Value>
                        </InformationRow>

                        {etudiant.vacation != null && <InformationRow> <Title>Etudiant : </Title><Value> Alumni</Value></InformationRow>}
                        {etudiant.vacation == null && <InformationRow> <Title>Etudiant : </Title><Value> Actuel</Value></InformationRow>}
                        {etudiant.vacation != null ? <div>
                            <InformationRow>
                                <Title> Date Obtention Diplome : </Title><Value>{etudiant.dateObtentionDiplome} </Value>
                            </InformationRow>


                        </div> : ''}
                        <InformationRow>
                            <h1>Curriculum Vitae</h1>
                        </InformationRow>

                        <InformationRow>
                            <h2>Experience:</h2>
                            <Value>
                                {etudiant.cv ? etudiant.cv.experience.map((i) => {
                                    return (

                                        <span style={{ marginInlineEnd: "40px" }}>{etudiant.cv != null ? i : '-'} ;</span>

                                    )
                                }) : 'no Experience ICI'}
                            </Value>
                        </InformationRow>
                        <InformationRow>
                            <h2>Formation:</h2>
                            <Value>
                                {etudiant.cv ? etudiant.cv.formation.map((i) => {
                                    return (

                                        <span style={{ marginInlineEnd: "40px" }}>{etudiant.cv != null ? i : '-'} ;</span>

                                    )
                                }) : 'no formation ICI'}
                            </Value>
                        </InformationRow>
                        <InformationRow>
                            <h2>Competences:</h2>
                            <Value>
                                {etudiant.cv ? etudiant.cv.Competences.map((i) => {
                                    return (

                                        <span style={{ marginInlineEnd: "5px" }}>{etudiant.cv != null ? i : '-'} ;</span>

                                    )
                                }) : 'Aucune Competences'}
                            </Value>
                        </InformationRow>

                        {/*{etudiant.vacation == null ?
                            <div>
                                {etudiant.pfe != null ?
                                    <div>
                                        <InformationRow>
                                            <h6 style={{ marginLeft: "100px" }}>Projet Fin D'Etudes</h6><br />
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Type:</Title><Value>{etudiant.pfe.type}</Value>
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Sujet:</Title><Value>{etudiant.pfe.sujet}</Value>
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Societe:</Title><Value>{etudiant.pfe.societe}</Value>
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Pays:</Title><Value>{etudiant.pfe.pays}</Value>
                                        </InformationRow>

                                        <br />
                                    </div> : <div><InformationRow><h1 style={{ marginInlineStart: "50px" }}>Cet Etudiant n a pas encore un PFE</h1><br /></InformationRow></div>}
                                {etudiant.pfe != null ?
                                    <div>
                                        <InformationRow>
                                            <h1 style={{ marginInlineStart: "50px" }}>Projet Fin D'Année</h1><br />
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Titre:</Title><Value>{etudiant.pfa.titre}</Value>
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Description:</Title><Value>{etudiant.pfa.description}</Value>
                                        </InformationRow>
                                        <InformationRow>
                                            <Title>Technologie:</Title><Value>{etudiant.pfa.technologie}</Value>
                                        </InformationRow>
                                    </div> : <div><InformationRow><h1 style={{ marginInlineStart: "50px" }}>Cet Etudiant n a pas encore un PFA</h1><br /></InformationRow></div>}
                            </div>
                                : ''}*/}
                    </Container>
                    : ''}
            </div>









        </div>

    );
};

export default withAuth(GetCvParEns, ["enseignant","etudiant"]);

export const Nom = styled.span`
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

export const Prenom = styled.p`
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

export const Title = styled.p`
font-family: 'montserrat';
font-weight: 600;
color: black;
font-size: 1.5rem;
width:fit-content;
width:30%;
margin:0;
margin-bottom:20px;
@media (max-width: 768px) {
    margin:0;
    width:100%;
}
@media (max-width: 460px) {
    font-size: 1.2rem;
  }

`;

export const Value = styled.p`
font-family: 'montserrat';
font-weight: 300;
color: black;
font-size: 1.4rem;
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
  width: 100%;
  justify-content:space-evenly;

  @media (max-width: 768px) {
    flex-direction:column;
    text-align:center;
    margin-bottom:2em;
  }
`

export const AccountStatus = styled.p`
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

export const Status = styled.span`
font-family: 'montserrat';
font-weight: 800;
color: ${({ status }) => (status === 'Non Validé' ? 'red' : 'green')};

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
export const Loading = styled.p`
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

`
export const Button = styled.button`
background-color: #008CBA; /* Green */
border: none;
color: white;
width:250px;
margin-left:38%;
margin-top:10px;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;`;

/* {etudiant ? (
                <Container>
                    <ProfilePicture src=".\profile.png"></ProfilePicture>
                    <NameRow>
                        <Prenom>{etudiant.prenom}<Nom> {etudiant.nom}</Nom></Prenom>
                    </NameRow>
                    <InformationRow>
                        <Title>Email</Title><Value>{etudiant.email}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Date De Naissance</Title><Value>{etudiant.dateNaissance}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Formation</Title><Value>{etudiant.formation}</Value>
                    </InformationRow>

                    {etudiant.visibilite === true && <div>
                        <AccountStatus>Son Compte Est <Status status="true">Public</Status></AccountStatus>
                    </div>}

                    {etudiant.visibilite === false && <div><AccountStatus>Son Compte Est <Status status="false">Private</Status></AccountStatus></div>}
                    <Title>Curriculum Vitae:</Title>



                </Container>
            ) : (
                <Container><Loading>Loading...</Loading> </Container>


            )}
            
             <div>
                <Container>
                    <ProfilePicture src=".\profile.png"></ProfilePicture>
                    <NameRow>
                        <Prenom>{etudiant.prenom}<Nom> {etudiant.nom}</Nom></Prenom>
                    </NameRow>
                    <InformationRow>
                        <Title>Email</Title><Value>{etudiant.email}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Date De Naissance</Title><Value>{etudiant.dateNaissance}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Formation</Title><Value>{etudiant.formation}</Value>
                    </InformationRow>

                    {etudiant.visibilite === true && <div>
                        <AccountStatus>Son Compte Est <Status status="true">Public</Status></AccountStatus>
                    </div>}

                    {etudiant.visibilite === false && <div><AccountStatus>Son Compte Est <Status status="false">Private</Status></AccountStatus></div>}
                    <Title>Curriculum Vitae:</Title>




                    <h3>Curriculum Vitae:</h3><br />
                    <h4>Experience:</h4><br />
                    {exp}
                    <h4>Formation:</h4><br />
                    {formations}
                    <h4>Competences:</h4><br />
                    {Competences}
                    <h3>Projet Fin D'Etudes:</h3><br />
                    <InformationRow>
                        <Title>Type:</Title><Value>{etudiant.pfe.type}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Sujet:</Title><Value>{etudiant.pfe.sujet}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Societe:</Title><Value>{etudiant.pfe.societe}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Pays:</Title><Value>{etudiant.pfe.pays}</Value>
                    </InformationRow>
                    <br />
                    <h3>Projet Fin D'Année:</h3><br />
                    <InformationRow>
                        <Title>Titre:</Title><Value>{etudiant.pfa.titre}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Description:</Title><Value>{etudiant.pfa.description}</Value>
                    </InformationRow>
                    <InformationRow>
                        <Title>Technologie:</Title><Value>{etudiant.pfa.technologie}</Value>
                    </InformationRow>
                </Container>
            </div>

            
            
            */