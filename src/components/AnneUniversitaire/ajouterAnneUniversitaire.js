import React, { useState } from "react";
import FormComponent from "../formContainer";
import { Alert, Button, TextField } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function AjouterAnneUniversitaire() {
  const [anne, setAnne] = useState({
    anne: "",
    semestre: 2,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnne((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:3000/anneuniversitaire", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(setError(false), navigate("/"))
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  return (
    <FormComponent
      height="130%"
      imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqkQseOL36TwzIMBdHluN0NWbZDy3WW7qATA&usqp=CAU"
    >
      <TitleLogin> Creer une anne Universitaire </TitleLogin>
      <InputName>Anne</InputName>
      <TextField
        id="filled-basic"
        label="anné"
        variant="filled"
        name="anne"
        onChange={handleChange}
      />
      <InputName>Semestre</InputName>
      <TextField
        id="filled-basic"
        label="semestre"
        variant="filled"
        name="semestre"
        onChange={handleChange}
      />
      <ButtonDiv>
        <Button
          variant="contained"
          onClick={handleSubmit}
          //   disabled={disableButton}
        >
          Valider
        </Button>
        {error && <Alert severity="error">Un erreur est survenue!</Alert>}
      </ButtonDiv>
    </FormComponent>
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
  height: 50%;
  margin-top: 1em;
  margin-bottom: 1em;
  align-items: center;
  display: flex;
  justify-content: center;
`;
