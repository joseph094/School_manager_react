import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUnverifiedAlumniAccounts } from "../../api/api";
import { useNavigate } from "react-router-dom";

function GetUnverifiedAlumniAccounts () {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          const dat = await getUnverifiedAlumniAccounts();
          setData(dat);
        };
        fetchData();

      });

    const arr = data.map((i,index) => {
        const isEven = (index + 1) % 2 === 0;
        if (i.verified === false) {
            return (
            <Row isEven={isEven}>
                <Column>{i.EtudiantAluId}</Column>
                <Column>{i.nom}</Column>
                <Column>{i.prenom}</Column>
                <Column>{i.dateNaissance}</Column>
                <Column>{i.formation}</Column>
                <Column>{i.poste}</Column>
                <ColumnAction>
                <Button onClick={() => navigate(`/valider/${i.EtudiantAluId}`)}>Details</Button>
                </ColumnAction>
            </Row>  
            );
        }
    })

    return (
        <Container>
           <Table>
            <Head>
                <HeadColumn>ID</HeadColumn>
                <HeadColumn>Nom</HeadColumn>
                <HeadColumn>Prenom</HeadColumn>
                <HeadColumn>Date Naissance</HeadColumn>
                <HeadColumn>Formation</HeadColumn>
                <HeadColumn>Poste</HeadColumn>
                <HeadColumnAction>Action</HeadColumnAction>
            </Head>
                {arr}
            </Table> 
        </Container>
    )

    
}
export default  GetUnverifiedAlumniAccounts;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding:20px;
    width: 95%; 
    margin: 10% auto;
    border-width: 0.5px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    border-radius: 30px;
    background-color:rgb(255, 255, 255) ;
    padding-block: 20px;
`
const Table = styled.table`
    border-radius:50px;
    border-spacing:0px;
    table-layout: fixed;
    width: 100%;
  
`

const Row = styled.tr`
    text-align:start;
    background-color: ${(props) => (props.isEven ? "#f0f0f0" : "#ffffff")};
    height:4em;
    
`

const Head=styled.thead`
    border: 10px solid red;
    background-color: #f0f0f0;
    th:first-child {
        border-radius: 10px 0px 0px 0px;
    }
    th:last-child {
        border-radius: 0px 10px 0px 0px;
    }
    margin-bottom:2em;

`
const HeadColumn = styled.th`
    font-family: 'montserrat';
    color: black;
    font-weight:800;
    font-size: 1.3rem;
    text-align:start;
`

const HeadColumnAction = styled.th`
    font-family: 'montserrat';
    color: black;
    font-weight:800;
    font-size: 1.3rem;
    text-align:center;
`
const Column = styled.td`
    font-family: 'montserrat';
    font-weight: 300;
    color: black;
    font-size: 0.8rem;
`
const ColumnAction = styled.td`
    text-align:center;
`
const Button = styled.button`
    width: 90%;
    height: 2.5em;
    border: none;
    border-radius: 12.92vw;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    background: #4981f5;
    font-family: "montserrat";
    font-weight: 800;
    font-size: 0.8rem;
    color: #ffffff;
    cursor: pointer;
`