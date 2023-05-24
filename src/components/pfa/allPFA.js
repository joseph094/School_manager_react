import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import './PFA.css'

function ListPfas() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/pfa', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("Getting", res.data)
            setData(res.data)
        }).catch(err => console.log(err));
    }, [])

    const filteredData = data.filter(item => item.technologie.includes(searchTerm));
    
    const arr = filteredData.map((i) => {
        return (
            <tr>
                <td className="colonne">
                    {i.idPfa}
                </td>
                <td className="colonne">
                    {i.titre}
                </td>
                <td className="colonne">
                    {i.description}
                </td>
                <td className="colonne">
                    {i.technologie}
                </td>
                <td className="colonne">
                    {i.nbEtudiants}
                </td>
                <td className="colonne">
                    {i.idEtudiant}
                </td>
                
            </tr>
        )

    })
    return (
        <Fragment>
            <div className="container">
                <h2 style={{marginLeft:"70px", marginTop: "3rem",marginBottom:"-20px"}} className="list_title" >La Liste des PFA </h2>
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
                    <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Recherche par technologie"/>
                    <table className="custom-table" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="table_head">
                                Id PFA
                                </th>
                                <th className="table_head">
                                Titre
                                </th>
                                <th className="table_head">
                                Description
                                </th>
                                <th className="table_head">
                                Technologie
                                </th>
                                <th className="table_head">
                                Nb etudiants
                                </th>
                                <th className="table_head">
                                Id Etudiant
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {arr}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )

}
const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 35px;
  width:98%;
`;

export default ListPfas;
