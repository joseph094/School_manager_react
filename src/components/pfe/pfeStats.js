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

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  Funnel,
  FunnelChart,
  LabelList,
  Bar,
} from "recharts";

import styled from "styled-components";
import withAuth from "../../hoc/hoc";

function PfeStats() {
  const [data, setData] = useState([""]);
  const [dataBox, setDataBox] = useState([]);
  const [societe, setSociete] = useState([]);

  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(350);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const user = jwtDecode(token);
    axios.get("http://localhost:3000/pfe/stat").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
    function retrieveObjectsWithPays(array) {
      return array.filter((obj) => obj.hasOwnProperty("pays"));
    }
    const paysinfo = retrieveObjectsWithPays(data);

    function retrieveObjectsWithSociete(array) {
      return array.filter((obj) => obj.hasOwnProperty("societe"));
    }
    const societeinfo = retrieveObjectsWithSociete(data);

    const d = paysinfo.map((cell) => {
      return {
        name: cell.pays,
        value: cell.count,
      };
    });
    const societe = societeinfo.map((cell) => {
      return {
        name: cell.societe,
        value: cell.count,
      };
    });
    setDataBox(d);
    setSociete(societe);

    console.log(dataBox, "databox");
  }, []);
  return (
    <Container>
      {/* <FormContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {data.map((cell) => (
                  <TableCell align="right">
                    {cell[Object.keys(cell)[0]]}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {data.map((cell) => (
                  <TableCell align="right">
                    {cell[Object.keys(cell)[1]]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </FormContainer> */}
      <Boxdiv>
        <>
          <SectionTitle>Pays</SectionTitle>
          <ChartSection>
            <BarChart width={width + 50} height={height} data={dataBox}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ChartSection>
        </>
      </Boxdiv>
      <Boxdiv>
        <>
          <SectionTitle>Entreprises</SectionTitle>

          <ChartSection>
            <BarChart width={width + 50} height={height} data={societe}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ChartSection>
        </>
      </Boxdiv>
    </Container>
  );
}
export default withAuth(PfeStats, ["admin", "DroitStats"]);

const Container = styled.div`
    background-color: #dfdfdf;
    position: absolute;
    width: auto;
    height: auto;
    display: flex;
    jusitfy-content : center;
      @media (max-width: 768px) {
        width: auto;
  
      height auto;
    }
  `;
const FormContainer = styled.div`
    background-color: white;
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
const Boxdiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 95%;
//   margin-top: 1%;
//   margin-inline: auto;
//   border-width: 0.5px;
//   height: fit-content;
//   border-style: solid;
//   border-color: rgb(230, 230, 230);
//   -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
//   -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
//   box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
//   border-radius: 15px;
//   background-color: rgb(255, 255, 255);
//   padding: 20px;
//   gap: 3em;
// `;
const CountBox = styled.div`
  display: flex;
  width: 23%;
  border-radius: 0.5em;
  background-color: #4981f5;
  @media (max-width: 550px) {
    width: 90%;
  }
`;
const Information = styled.div`
  font-family: "montserrat";
  width: 100%;
  color: white;
  padding-inline: 1em;
  padding-block: 1.8em;
  @media (max-width: 1310px) {
    text-align: center;
  }
`;

const Section = styled.div`
  width: 100%;
  color: white;
  display: flex;
  background-color: #f0f0f0;
  flex-direction: column;
  border-radius: 12px;
  border-style: solid;
  border-width: 0.3px;
  border-color: rgb(230, 230, 230);
  -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  gap: 3em;
`;
const Count = styled.h3`
  margin: 0;
  font-size: 2rem;
`;
const Title = styled.p`
  font-size: 1rem;
`;
const Year = styled.p`
  font-size: 0.9rem;
  font-weight: 1000;
  color: black;
  opacity: 0.5;
`;
const Icon = styled.div`
  opacity: 0.2;
  color: black;
  display: flex;
  align-items: center;
  @media (max-width: 1310px) {
    display: none;
  }
`;

const PromotionCounts = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2em;
  flex-wrap: wrap;
  padding: 1em;
  @media (max-width: 550px) {
    flex-direction: column;
    align-content: center;
  }
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 2em;
    align-items: center;
  }
`;
const TopPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SectionTitle = styled.h2`
  font-family: "montserrat";
  color: white;
  font-size: 2.5rem;
  background-color: #4981f5;
  border-radius: 0px 30px 30px 0px;
  width: 10em;
  padding-left: 0.5em;
  margin-bottom: 1em;
  text-align: start;
  @media (max-width: 460px) {
    font-size: 2rem;
    width: 7em;
  }
  @media (max-width: 280px) {
    background-color: #f0f0f0;
    color: #4981f5;
    width: fit-content;
    font-size: 1.5rem;
  }
`;

const BottomPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const SubSectionTitle = styled.h3`
  font-family: "montserrat";
  color: black;
  font-size: 2rem;
  border-bottom: 3px solid #4981f5;
  margin-left: 1em;
  width: 10em;
  @media (max-width: 460px) {
    font-size: 1.5rem;
    width: 7em;
  }
  @media (max-width: 280px) {
    font-size: 1rem;
  }
`;

const Chomage = styled.p`
  align-self: center;
  font-family: "montserrat";
  color: black;
  text-align: center;
  font-size: 3rem;
  margin-left: 1em;
  height: 5em;
  @media (max-width: 460px) {
    font-size: 1rem;
  }
`;
const Avg = styled.span`
  font-family: "montserrat";
  border-radius: 5px;
  background-color: #4981f5;
  font-size: 3.5rem;
  color: white;
  @media (max-width: 460px) {
    font-size: 1.5rem;
  }
`;
