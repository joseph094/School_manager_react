import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import { Alert, Button, Input, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InsertPFE() {
  const [stagePFE, setStagePFE] = useState({
    sujet: "",
    type: "",
    societe: "",
    pays: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStagePFE((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const etud = await axios.get(
      "http://localhost:3000/etudiant-actuel/" + user.sub
    );
    console.log("user", etud);
    if (etud.data.niveau === "3") {
      axios
        .post(
          "http://localhost:3000/etudiant-actuel/addpfe/" + user.sub,
          stagePFE
        )
        .then(setError(false), navigate("/"))
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    console.log(stagePFE);
    setError(false);
  }, [stagePFE]);

  return (
    <AllContainer>
      <FormComponent
        height="130%"
        imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU"
      >
        <TitleLogin>Ajouter Stage PFE</TitleLogin>
        <InputName>Sujet</InputName>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          name="sujet"
          onChange={handleChange}
          data-test="sujet"
        />
        <InputName>Type</InputName>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          name="type"
          onChange={handleChange}
          data-test="type"
        />
        <InputName>Societe</InputName>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          name="societe"
          onChange={handleChange}
          data-test="societe"
        />

        <InputName> Pays </InputName>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          name="pays"
          onChange={handleChange}
          data-test="pays"
        />
        <ButtonDiv>
          <Button
            variant="contained"
            onClick={handleSubmit}
            //   disabled={disableButton}
            data-test="valider"
          >
            Valider
          </Button>
          {error && (
            <Alert severity="error" data-test="alert">
              Un erreur est survenue!
            </Alert>
          )}
        </ButtonDiv>
      </FormComponent>
    </AllContainer>
  );
}
const InputName = styled.h3`
  color: #4981f5;
`;

const TitleLogin = styled.h1`
  color: #4981f5;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 0.5em;
    font-size: 1.5em;
  }
`;
const ButtonDiv = styled.div`
  width: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const AllContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 10 % auto;
  @media (max-width: 768px) {
    margin-top: 0.5em;
  }
`;
