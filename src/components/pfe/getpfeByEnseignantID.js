import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import withAuth from "../../hoc/hoc";

function GetpfeByEnseignantId() {
  const [data, setData] = useState([""]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const user = jwtDecode(token);
    axios
      .get("http://localhost:3000/pfe/enseignant/" + user.sub)
      .then((res) => {
        setData(res.data);
        console.log("pfeEnseignant", res.data);
      });
  }, []);
  return (
    <Container>
      <FormContainer>
        <TableContainer component={Paper} style={{ alignItems: "center" }}>
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
              {data.map((row, index) => (
                <TableRow
                  key={index}
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
export default withAuth(GetpfeByEnseignantId, ["enseignant"]);

const Container = styled.div`
backgroundColor: "#dfdfdf",
position: "absolute",
width: "100%",
height: "100%",
display: "flex",
justifyContent: "center",
[theme.breakpoints.down("sm")]: {
  flexDirection: "column",
  alignItems: "center",
},
    @media (max-width: 768px) {
      width: auto;

    height auto;
  }
`;
const FormContainer = styled.div`
backgroundColor: "white",
width: "90%",
height: "auto",
marginLeft: "3em",
borderRadius: "30px",
[theme.breakpoints.down("sm")]: {
  width: "auto",
  height: "auto",
  margin: "0.2em",
},
@media (max-width: 768px) {
  width : auto;
  height auto;
  margin : 0.2em;
}

`;
