import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import withAuth from "../../hoc/hoc";

function Getpfe() {
  const [data, setData] = useState([""]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get("http://localhost:3000/pfe").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Container>
      <FormContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sujet</TableCell>
                <TableCell align="right">type</TableCell>
                <TableCell align="right">pays</TableCell>
                <TableCell align="right">societe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.idpfe}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.sujet}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.pays}</TableCell>
                  <TableCell align="right">{row.societe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormContainer>
    </Container>
  );
}
export default withAuth(Getpfe, ["admin", "enseignant", "etudiant","DroitEtud"]);



const Container = styled.div`
  background-color: #dfdfdf;
  width: auto;
  display: flex;
  jusitfy-content : center;
    @media (max-width: 768px) {
      width: auto;

    height auto;
  }
`;
const FormContainer = styled.div`
  width : 90%;
  height : auto;


 margin-left:3em;


border-radius: 30px;
@media (max-width: 768px) {
  width : auto;
  height auto;
  margin : 0.2em;
}

`;
