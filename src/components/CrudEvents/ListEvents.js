import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Events.css'

function ListEvents() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const navigate = useNavigate();



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
                <td>
                    {i.idEvenement}
                </td>
                <td>
                    {i.nom}
                </td>
                <td>
                    {i.dateEvenement}
                </td>
                <td>
                    {i.description}
                </td>
                <td>
                    <Button onClick={() => navigate(`/Events/${i.idEvenement}`, { replace: true })} >edit</Button>
                </td>
                <td>
                    <Button onClick={() => DeleteEvent(i.idEvenement)} >delete</Button>
                </td>
            </tr>
        )

    })
    return (
        <Fragment>
            <div className="container">
                <h2 >La Liste des Evenements </h2>
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
                    <table className="custom-table" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    IdEvent
                                </th>
                                <th>
                                    Even Name
                                </th>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>

                                </th>
                                <th>

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

export default ListEvents;