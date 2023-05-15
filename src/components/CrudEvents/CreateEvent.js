import axios from "axios"
import React, { useState } from "react"
import './CreateEvent.css'
import withAuth from "../../hoc/hoc";

function CreateEvent() {
    const token = localStorage.getItem('token');
    const [idEvent, setIdEvent] = useState('')
    const [NomEvent, setNomEvent] = useState('')
    const [dateEvent, setdateEvent] = useState('')
    const [anneUni, setanneUni] = useState('')

    const [desc, setdesc] = useState('')


    const AddEvent = (e) => {
        axios.post('http://localhost:3000/evenement/create', {
            idEvenement: idEvent,
            nom: NomEvent,
            dateEvenement: dateEvent,
            description: desc,
            anneuniversitaireName: anneUni
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => console.log("this is the post method", res),
            window.location.reload(false)
        ).catch(err => console.log(err));
    }
    return (<div className="contact1">
        <div className="container-contact1">
            <div className="contact1-pic js-tilt" data-tilt>
                <img src="/event.png" alt="IMG" />
            </div>

            <div className="contact1-form">
                <span className="contact1-form-title">
                    Create An event
                </span>

                <div className="wrap-input1" >
                    <input className="input1" type="text" placeholder="Event Ref" value={idEvent} onChange={(e) => setIdEvent(e.target.value)} />
                </div>

                <div className="wrap-input1">
                    <input className="input1" type="text" placeholder="Event Name" value={NomEvent} onChange={(e) => setNomEvent(e.target.value)} />
                </div>
                <div className="wrap-input1">
                    <input className="input1" type="text" placeholder="Event Anne Universitaire" value={anneUni} onChange={(e) => setanneUni(e.target.value)} />
                    <label>svp  de type 2022-2023</label>

                </div>

                <div className="wrap-input1">
                    <input className="input1" type="date" placeholder="Event Date" value={dateEvent} onChange={(e) => setdateEvent(e.target.value)} />
                </div>

                <div className="wrap-input1">
                    <textarea className="input1" value={desc} onChange={(e) => setdesc(e.target.value)} placeholder="A little Description"></textarea>
                </div>

                <div className="container-contact1-form-btn" >
                    <button className="contact1-form-btn" onClick={AddEvent} >
                        <span>
                            Create New Event
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>)
}
export default withAuth(CreateEvent,["admin","Droitevent"]);
