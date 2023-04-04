import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import styled from "styled-components";

export default function GetallEtudiants() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/etudiant/all").then((res) => {
      setData(res.data);
    });
  });
  return (
    <Container>
      <TableContainer component={Paper}>
        <FormContainer>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Prenom</TableCell>
                <TableCell align="right">Formation</TableCell>
                <TableCell align="right">Date De naissance</TableCell>
                <TableCell align="right">E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.login}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nom}
                  </TableCell>
                  <TableCell align="right">{row.nom}</TableCell>
                  <TableCell align="right">{row.formation}</TableCell>
                  <TableCell align="right">{row.dateNaissance}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FormContainer>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #dfdfdf;
  position: absolute;
  width: 100%;
  height: ${(props) => (props.height == undefined ? "160%" : props.height)};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    
    height 190%;
  }
`;
const FormContainer = styled.div`
  background-color: white;
  width : 90%;
  
  box-shadow:
  2.8px 2.8px 2.2px rgba(0, 0, 0, 0.008),
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.012),
  12.5px 12.5px 10px rgba(0, 0, 0, 0.015),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.018),
  41.8px 41.8px 33.4px rgba(0, 0, 0, 0.022),
  100px 100px 80px rgba(0, 0, 0, 0.03)
;

 margin-left:3em;
;


border-radius: 30px;
@media (max-width: 768px) {
  width : 80%;
  height 100%;
}

`;
