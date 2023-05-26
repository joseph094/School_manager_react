import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Events.css'
import jwt_decode from 'jwt-decode';
import withAuth from "../../hoc/hoc";


function ListEvents() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const decodedToken = jwt_decode(token);
    const role = decodedToken.roles[0];




    const handleDelete = (id) => {
        setData(data.filter(item => item.idEvenement !== id));
    }
    useEffect(() => {
        axios.get('http://localhost:3000/evenement', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("Getting", res.data)
            setData(res.data)
        }).catch(err => console.log(err));
    }, [])

    const DeleteEvent = (id) => {
        axios.delete(`http://localhost:3000/evenement/${id}`, {
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
                    {i.idEvenement}
                </td>

                <td className="colonne">
                    {i.nom}
                </td>
                <td className="colonne">
                    {i.dateEvenement}
                </td>
                <td className="colonne">
                    {i.description}
                </td>
                {role !== 'etudiant' ?
                    <div>
                        <td className="colonne">
                            <button className="list_btn" onClick={() => navigate(`/Events/${i.idEvenement}`, { replace: true })} >edit</button>
                        </td>
                        <td className="colonne">
                            <button className="list_btn" onClick={() => DeleteEvent(i.idEvenement)} >delete</button>
                        </td>
                    </div>
                    : ""}
            </tr>
        )

    })
    return (
        <Fragment>
            <div className="container">
                <h2 className="titre" >La Liste des Evenements </h2>
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
                    <table className="custom-table" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="table_head">
                                    Ref
                                </th>

                                <th className="table_head">
                                    Event Name
                                </th>
                                <th className="table_head">
                                    Date
                                </th>
                                <th className="table_head">
                                    Description
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

export default withAuth(ListEvents, ["admin", "Droitevent", "etudiant", "alumni"]);
