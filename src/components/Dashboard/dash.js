import React, { useEffect, useState } from "react";
import "./Modal.css";
import jwt_decode from 'jwt-decode';
import { getEtudiantAlumni, getToken, getEudiantActuel, GetUser } from '../../api/api';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hoc/hoc";

function Modal() {
    const [modal, setModal] = useState(false);
    const [etudiant, setEtudiant] = useState(null);
    const [user, setUser] = useState(null);
    const [diplome, setdiplome] = useState(null);
    const [err, seterr] = useState(null);
    const navigate = useNavigate();


    const decodedToken = jwt_decode(getToken());
    const currentYear = new Date().getFullYear();

    const redoublant = () => {

        etudiant.Reussi = parseInt("1");
        axios
            .put("http://localhost:3000/etudiant-actuel/update", etudiant)
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => { console.log(err); });


    }
    const reussi = () => {

        if (parseInt(etudiant.niveau) < 3) {
            etudiant.niveau = (parseInt(etudiant.niveau) + 1).toString();
            etudiant.Reussi = parseInt("1");
            console.log(etudiant);
            axios
                .put("http://localhost:3000/etudiant-actuel/update", etudiant)
                .then((res) => {
                    console.log(res);
                    window.location.reload(false);
                })
                .catch((err) => { console.log(err); });
        } else if (diplome === null) {


        }
        else {
            const student = etudiant;
            axios
                .delete("http://localhost:3000/etudiant-actuel/" + etudiant.EtudiantActId)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .post("http://localhost:3000/etudiant-alumni/insteraftersucess", {
                    nom: student.nom,
                    prenom: student.prenom,
                    dateNaissance: student.dateNaissance,
                    login: parseInt(student.login),
                    mdp: student.mdp,
                    formation: student.formation,
                    email: student.email,
                    EtudiantAluId: student.EtudiantActId,
                    visibilite: student.visibilite,
                    cv: student.cv,
                    pfe: student.pfe,
                    pfa: student.pfa,
                    dateObtentionDiplome: diplome,
                    roles: student.roles,
                    societe: null,
                    pays: null,
                    verified: null,
                    dateEmbacuhe: null
                })
                .then(localStorage.removeItem("token"),
                    navigate('/signin')

                )
                .catch((err) => { console.log(err); });
        }




    }







    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        const fetchData = async () => {

            const data = await getEudiantActuel(decodedToken.sub);
            const userTypeData = await GetUser(decodedToken.sub, decodedToken.roles[0]);
            setUser(userTypeData)
            console.log(user);
            setEtudiant(data);
        };
        fetchData();
        ;
    }, []);
    useEffect(() => {


        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        if (etudiant) {
            if (parseInt(etudiant.Reussi) === 0 && currentMonth === 4) { // September (0-indexed)
                setModal(true);
            }
        }
    }, [etudiant])

    return (
        <>
            {modal &&
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div data-test="modal" className="modal-content">
                        <h2> Année Universtiaire {currentYear}/{currentYear + 1} </h2>
                        <h4>Bonjour {etudiant ? etudiant.nom + ' ' + etudiant.prenom : ''} </h4>

                        <p>
                            Nous Esperons que vous allez bien .Avant d'acceder votre espace ,  nous aimerions savoir comment vous avez fait l'année scolaire précédente
                        </p>
                        <div className="wrap-input1">
                            <input data-test="test-obtention" className="signInput" type="date" placeholder="Date Obtention Diplome" name="diplome" value={diplome} onChange={(e) => setdiplome(e.target.value)} />
                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                        <button data-test="reussi-btn-year" className="green-button" onClick={reussi} > Reussi(e) </button>
                        <button data-test="redoublante-btn-year"  className="red-button" onClick={redoublant}> Redoublant(e) </button>
                    </div>
                </div>
            }
            {user ? <div className="dash-container">

                <div className="text-wrapper">

                    <h2>Bonjour, {user.nom} {user.prenom}</h2>
                    <p>Voir Les derniers Actualites sur Institut Supérieur des Arts Multimédia de la Manouba </p>
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Actualités</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Organisation des stages d'été

                                    Les étudiants inscrits en L1, L2 et M1 désirant effectuer un stage d'été sont priés de déposer chez le...</td>
                            </tr>
                            <tr class="active-row">
                                <td>PFEs Licences | Procédure et date limite du dépôt

                                    Institut Supérieur des Arts Multimédia de la Manouba (ISAMM) informe ses étudiants inscrits en L3 que les...</td>
                            </tr>
                            <tr>
                                <td>Semestre 2 | Calendrier des examens - Session de mai 2023

                                    Vous trouverez ci-joint le calendrier des examens de la session principale du Semestre 2 de l'année universitaire 2022/2023. Veuillez...</td>
                            </tr>
                            <tr class="active-row">
                                <td>PFEs Licences | extension de la date limite de dépôt

                                    L'Isamm informe les étudiants inscrits en 3 ème année licence (spécialités BI, BIS, et E-B) que la date limite...</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="image-wrapper">
                    <img src="/schooled.png" alt="Image" className="school-image" />
                </div>
            </div> : ""}


        </>
    );
}
export default withAuth(Modal, ["responsable",
    "enseignant",
    "admin",
    "etudiant",
    "alumni",
    "unverified",
    "refused",
    "DroitDemande",])
