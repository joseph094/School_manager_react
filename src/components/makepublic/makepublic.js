import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getEtudiantAlumni, getToken, getEudiantActuel } from '../../api/api';
import styled from "styled-components";





function MakeAccountPublic() {
    const [visible, setStatus] = useState();
    const [etudiant, setEtudiant] = useState(null);
    const decodedToken = jwt_decode(getToken());

    function checkVerificationStatus() {
        if (etudiant != null) {
            if (etudiant.visibilite ===false) {
                setStatus('Private')
            } else {
                setStatus('Public')
            }
        }
    }
    async function MakePublic() {

        const data = await getEtudiantAlumni(decodedToken.sub);
        // console.log(data==="")

        if (data === "") {
            //console.log("data",data)
            const data = await getEudiantActuel(decodedToken.sub);
            setEtudiant(data);
            etudiant.visibilite = true;
            const res = await axios.put("http://localhost:3000/etudiant-actuel/update", etudiant, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            })

            window.location.replace('/make-public');
        } else {
            setEtudiant(data);
            etudiant.visibilite = true;
            const res = await axios.put("http://localhost:3000/etudiant-alumni/update", etudiant, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            })

            window.location.replace('/make-public');
        }




    }
    async function MakePrivate() {

        const data = await getEtudiantAlumni(decodedToken.sub);
        // console.log(data==="")

        if (data === "") {
            //console.log("data",data)
            const data = await getEudiantActuel(decodedToken.sub);
            setEtudiant(data);
            etudiant.visibilite = false;
            const res = await axios.put("http://localhost:3000/etudiant-actuel/update", etudiant, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            })

            window.location.replace('/make-public');
        } else {
            setEtudiant(data);
            etudiant.visibilite = false;
            const res = await axios.put("http://localhost:3000/etudiant-alumni/update", etudiant, {
                headers: { 'Authorization': `Bearer ${getToken()}` }

            })
            window.location.replace('/make-public');
        }




    }


    useEffect(() => {
        const fetchData = async () => {

            const data = await getEtudiantAlumni(decodedToken.sub);
            // console.log(data==="")


            if (data === "") {
                //console.log("data",data)
                const data = await getEudiantActuel(decodedToken.sub);
                setEtudiant(data);
                checkVerificationStatus()
            } else {
                setEtudiant(data);
                checkVerificationStatus()
            }

        };
        fetchData();
        ;
    }, []);



    return (
        <div>



            <div>
                {etudiant ? (
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
                            <AccountStatus>Votre Compte Est <Status status="true">Public</Status></AccountStatus>
                            <Button onClick={MakePrivate} > Make it Private </Button></div>}
                            
                        {etudiant.visibilite === false && <div><AccountStatus>Votre Compte Est <Status status="false">Private</Status></AccountStatus> <Button onClick={MakePublic} >  Make it Public </Button></div>}



                    </Container>
                ) : (
                    <Container><Loading>Loading...</Loading> </Container>

                )}
            </div>
        </div>
    );
};

export default MakeAccountPublic;

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