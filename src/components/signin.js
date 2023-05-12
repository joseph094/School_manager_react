import {
  Alert,
  Button,
  Divider,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Navigate, Redirect, useNavigate } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormComponent from "./formContainer";
export default function Signin() {
  const [form, setForm] = useState({
    login: "",
    motdepasse: "",
    type: "",
  });
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  let navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const authUser = () => {
    console.log(form);
    const url = "http://localhost:3000/" + form.type + "/auth/signin";
    axios
      .post(url, {
        login: parseInt(form.login),
        mdp: form.motdepasse,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.access_token);
        setError(false);
        setIsLogged(true);
      })
      .catch((er) => {
        console.log("ERROR CATCHED BY ME ", er);
        setError(true);
      });
  };
  useEffect(() => {
    console.log(form);
    if (form.login == "" || form.motdepasse == "" || form.type == "") {
      setDisableButton(true);
    } else {
      if (isNaN(form.login)) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    }
    console.log(isLogged);
    if (isLogged) {
      return navigate("/ajouteretudiant");
    }
  }, [form, isLogged]);
  return (
    <FormComponent>
      <TitleLogin>Se connecter</TitleLogin>
      <InputName>Login</InputName>
      <TextField
        id="filled-basic"
        label="Login"
        variant="filled"
        name="login"
        onChange={handleChange}
        value={form.login}
        data-test="login"
      />
      <InputName>Mot de passe</InputName>
      <TextField
        id="filled-basic"
        label="Mot de passe"
        variant="filled"
        name="motdepasse"
        onChange={handleChange}
        value={form.motdepasse}
        type="password"
        data-test="mdp"
      />

      <InputName>Type de Profil</InputName>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Type"
        name="type"
        onChange={handleChange}
        data-test="type"
      >
        <MenuItem value={"admin"}>Admin</MenuItem>
        <MenuItem value={"etudiant"}>Etudiant</MenuItem>
        <MenuItem value={"enseignant"}>Enseignant</MenuItem>
        <MenuItem value={"responsable"}>Responsable</MenuItem>
      </Select>
      <Button
        variant="contained"
        onClick={authUser}
        disabled={disableButton}
        data-test="valider"
      >
        Valider
      </Button>
      {error && (
        <Alert severity="error">
          Un erreur est survenue , Veuillez vérifier vos cordonnées !
        </Alert>
      )}
      <Divider>
        {" "}
        <Mdp>Mot de passe oublié ?</Mdp>{" "}
      </Divider>
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
const Mdp = styled.small`
  color: #5f97f9;
`;
