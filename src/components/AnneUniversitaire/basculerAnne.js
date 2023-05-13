import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import styled from "styled-components";
import { TextField } from "@mui/material";

function BasculerAnne() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [anne, setAnne] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnne(value);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/evenement", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Getting", res.data);
        console.log(anne);
        const d = res.data;
        const final = d.filter((event) => event.anneuniversitaire.anne == anne);
        setData(final);
      })
      .catch((err) => console.log(err));
  }, [anne]);

  const arr = data.map((i, index) => {
    return (
      <tr key={index}>
        <td className="colonne">{i.idEvenement}</td>
        <td className="colonne">{i.nom}</td>
        <td className="colonne">{i.dateEvenement}</td>
        <td className="colonne">{i.description}</td>
      </tr>
    );
  });
  return (
    <Fragment>
      <div className="container">
        <h2 className="list_title">La Liste des Evenements </h2>
        <StyledDiv>
          {" "}
          <InputName>Saisir une anné universitaire </InputName>
          <TextField
            id="filled-basic"
            label="Anné"
            variant="filled"
            name="anne"
            onChange={handleChange}
            data-test="anne"
          />
        </StyledDiv>

        <div style={{ margin: "4rem", marginTop: "3rem" }}>
          <table className="custom-table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="table_head">IdEvent</th>
                <th className="table_head">Even Name</th>
                <th className="table_head">Date</th>
                <th className="table_head">Description</th>
              </tr>
            </thead>
            <tbody>{arr}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default BasculerAnne;

const InputName = styled.h3`
  color: #4981f5;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
