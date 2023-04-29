import { Box, Button, Container } from "@mui/material";
import { findByLabelText } from "@testing-library/react";
import React from "react";
import styled from "styled-components";

export default function EnseignantDashboard() {
  return (
    <ContainerDiv maxWidth="sm">
      <Box sx={{ bgcolor: "#FFFFFF", height: "90vh", width: "90vh" }}>
        <LittleContainer>
          <PfeImg src="data:image/jpeg;base64,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" />
          <Button variant="outlined">
            <a href="/getpfeenseignant">Voir PFE </a>{" "}
          </Button>
        </LittleContainer>
        <LittleContainer>
          <PfeImg src="data:image/png;base64,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" />

          <Button variant="outlined">
            {" "}
            <a href="/choisirpfe">Chosir PFE</a>{" "}
          </Button>
        </LittleContainer>
      </Box>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
  }
`;
const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1em;
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin: 2em;
  }
`;
const PfeImg = styled.img`
  display: flex;
  justify-content: center;
  margin-left: 11em;
  margin-top: 2em;
  margin-bottom: 2em;
  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin: 1em;
  }
`;
