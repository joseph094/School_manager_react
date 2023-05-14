import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import './pfa.css'

function ListPfasEnseignant() {
    
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    
    const handleDelete = (id) => {
        setData(data.filter(item => item.idPfa !== id));
    }
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const user = jwtDecode(token);
        axios
          .get("http://localhost:3000/pfa")
          .then((res) => {
            setData(res.data);
            console.log(res.data);
          });
      }, []);

      const DeletePfa = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3000/pfa/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => console.log("this is the Delete method", res),
                handleDelete(id)
            ).catch(err => console.log(err));
    }



    const arr = data.map((i) => {
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
                <td className="colonne">
                    <button className="list_btn" onClick={() => navigate(`/updatepfa/${i.idPfa}`, { replace: true })} >edit</button>
                </td>
                <td className="colonne">
                <button className="list_btn" onClick={() => DeletePfa(i.idPfa)} >delete</button>
                </td>
            </tr>
        )

    })
    return (
        <Fragment>
            <div className="container">
            
                    <button style={{float:"Right", margin: "4rem"}} className="list_btn" onClick={() => navigate(`/addpfa`, { replace: true })} >add</button>

                <h2 style={{marginLeft:"70px", marginTop: "3rem",marginBottom:"-20px"}} className="list_title" >La Liste des PFA </h2>
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
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
                                <th className="table_head">

                                </th>
                                <th className="table_head">

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

export default ListPfasEnseignant; 