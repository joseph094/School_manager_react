import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

function AddingAdmin() {
    const token = localStorage.getItem('token');
    let navigate = useNavigate();
    const [Admin, setAdminData] = useState({
        idAdmin: "",
        nom: "",
        prenom: "",
        login: 0,
        mdp: "",
        email: "",
        OperationsEtud: true,
        ImportExcel: true,
        OperationsEvent: true,
        OperationsEns: true,
        OperationsDemande: true,
        OperationsStats: true,
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAdminData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleCheckboxChange = (field) => {
        setAdminData((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };
    const AddAdmin = (e) => {
        axios.post('http://localhost:3000/admin/auth/signup', {
            idAdmin: Admin.idAdmin,
            prenom: Admin.prenom,
            nom: Admin.nom,
            email: Admin.email,
            login: parseInt(Admin.login),
            mdp: Admin.mdp,
            ImportExcel: Admin.ImportExcel,
            OperationsEtud: Admin.OperationsEtud,
            OperationsEvent: Admin.OperationsEvent,
            OperationsEns: Admin.OperationsEns,
            OperationsDemande: Admin.OperationsDemande,
            OperationsStats: Admin.OperationsStats,

        }, {
        }).then(res => console.log("this is the post method", res),
            navigate("/"),
        ).catch(err => console.log(err));
    }
    const create = (e) => {

        console.log(Admin);
    }
    return (<div className="contact1">
        <div className="container-contact1">
            <div className="contact1-pic js-tilt" data-tilt>
                <img src="/administration.png" alt="IMG" />
            </div>

            <div className="contact1-form">
                <span className="contact1-form-title">
                    Ajouter un Administratif
                </span>

                <div className="wrap-input1" >
                    <input className="input1" type="text" placeholder="Refernce Admin" name="idAdmin" value={Admin.idAdmin} onChange={handleChange} />
                </div>

                <div className="wrap-input1">
                    <input className="input1" type="text" placeholder="nom" name="nom" value={Admin.nom} onChange={handleChange} />
                </div>

                <div className="wrap-input1">
                    <input className="input1" type="text" placeholder="prenom" name="prenom" value={Admin.prenom} onChange={handleChange} />
                </div>

                <div className="wrap-input1">
                    <input className="input1" type="number" placeholder="login" name="login" value={Admin.login} onChange={handleChange} />
                </div>

                <div className="wrap-input1">
                    <input className="input1" type="text" placeholder="Mot de Passe" name="mdp" value={Admin.mdp} onChange={handleChange} />
                </div>



                <div className="wrap-input1">
                    <input className="input1" type="text" placeholder="email" name="email" value={Admin.email} onChange={handleChange} />
                </div>
                <div>
                    {Object.entries(Admin).map(([field, value]) => {
                        if (typeof value === 'boolean') {
                            return (
                                <div>
                                    <label key={field}>
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={() => handleCheckboxChange(field)}
                                        />
                                        {field === "OperationsEtud" ? "Droit Gerer Etudiant" : ""}
                                        {field === "ImportExcel" ? "Importer Par Excel" : ""}
                                        {field === "OperationsEvent" ? "Droit Gerer Evenements" : ""}
                                        {field === "OperationsEns" ? "Droit Gerer Enseignants" : ""}
                                        {field === "OperationsDemande" ?"Droit Gerer les demandes " : ""}
                                        {field === "OperationsStats" ? "Consulter les stats" : ""}
                                    </label>
                                    <br />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="container-contact1-form-btn" >
                    <button className="contact1-form-btn" onClick={AddAdmin} >
                        <span>
                            Ajouter un Administratif
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>)
}
export default AddingAdmin;