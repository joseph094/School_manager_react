import React, { useEffect, useState } from "react";
import {
  Button,
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
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getEtudiantAlumni, getToken, getEudiantActuel } from "../../api/api";

export default function GetallEtudiants() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const decodedToken = jwt_decode(getToken());

  useEffect(() => {
    axios.get("http://localhost:3000/etudiant/all").then((res) => {
      setData(res.data);
      console.log(decodedToken);
    });
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <FormContainer>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Prenom</TableCell>
                <TableCell align="right">Formation</TableCell>
                <TableCell align="right">Date De naissance</TableCell>
                <TableCell align="right">E-mail</TableCell>
                {decodedToken.roles[0] === "admin" ? (
                  <TableCell align="right">Detail</TableCell>
                ) : (
                  <TableCell align="right">cv</TableCell>
                )}
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
                  <TableCell align="right">{row.prenom}</TableCell>
                  <TableCell align="right">{row.formation}</TableCell>
                  <TableCell align="right">{row.dateNaissance}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  {decodedToken.roles[0] === "admin" ? (
                    <div>
                      <TableCell align="right">
                        {row.vacation != null ? (
                          <InfoIcon
                            onClick={() =>
                              navigate(
                                `/detail-etudiant/${row.EtudiantAluId}`,
                                { replace: true }
                              )
                            }
                          >
                            {" "}
                          </InfoIcon>
                        ) : (
                          <>
                            <InfoIcon
                              onClick={() =>
                                navigate(
                                  `/detail-etudiant/${row.EtudiantActId}`,
                                  { replace: true }
                                )
                              }
                            >
                              {" "}
                            </InfoIcon>
                          </>
                        )}
                      </TableCell>
                    </div>
                  ) : (
                    <div>
                      <TableCell align="right">
                        {row.vacation != null ? (
                          <InfoIcon
                            onClick={() =>
                              navigate(`/consult-cv/${row.EtudiantAluId}`, {
                                replace: true,
                              })
                            }
                          >
                            {" "}
                          </InfoIcon>
                        ) : (
                          <InfoIcon
                            onClick={() =>
                              navigate(`/consult-cv/${row.EtudiantActId}`, {
                                replace: true,
                              })
                            }
                          >
                            {" "}
                          </InfoIcon>
                        )}
                      </TableCell>
                    </div>
                  )}
                  {decodedToken.roles[0] == "admin" && (
                    <Button
                      onClick={() => {
                        navigate(`/getetudiant/${row.login}`);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FormContainer>
      </TableContainer>
    </Container>
  );
}

const Btn = styled.button`
  opacity: 0;
`;

const Container = styled.div`
  background-color: #dfdfdf;
  position: absolute;
  width: 90%;
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
  


 margin-left:3em;
;


border-radius: 30px;
@media (max-width: 768px) {
  width : 80%;
  height 100%;
}

`;
