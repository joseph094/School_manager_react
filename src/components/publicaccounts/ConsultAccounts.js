import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import './accounts.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { getEtudiantAlumni, getToken, getEudiantActuel, GetUser } from '../../api/api';
import withAuth from "../../hoc/hoc";

function ConsultPublicAccounts() {
  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const decodedToken = jwt_decode(getToken());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/etudiant/all", config);
        console.log(decodedToken);
        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchData();
  }, [config]);

  return (
    <div style={{ flexGrow: 1 }} className="p-2" id="contain">
      <h1 className="titre">Liste des comptes publiques</h1>
      {error && <p>Une erreur est survenue lors de la récupération des données.</p>}
      {!error && (
        <div className="container1">
          <table className="custom-table1">
            <thead>
              <tr>
                <th className="table_head1">Nom</th>
                <th className="table_head1">Prénom</th>
                <th className="table_head1">email</th>
                <th className="table_head1">Date de naissance </th>
                <th className="table_head1">Type</th>
                <th className="table_head1">CV</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                if (row.visibilite === true) {
                  return (
                    <tr key={row.id}>
                      <td data-test="colonne" className="colonne1">{row.nom}</td>
                      <td data-test="colonne" className="colonne1" >{row.prenom}</td>
                      <td data-test="colonne" className="colonne1">{row.email}</td>
                      <td data-test="colonne" className="colonne1">{row.dateNaissance}</td>
                      {row.vacation != null && <td className="colonne1">Alumni</td>}
                      {row.vacation == null && <td className="colonne1">Actuel</td>}

                      <td className="colonne1">
                        {row.vacation != null && <a className="document" data-test="public-account-cv" onClick={() => navigate(`/consult-cv/${row.EtudiantAluId}`)}><DocumentScannerIcon /> </a>}
                        {row.vacation == null && <a className="document" data-test="public-account-cv" onClick={() => navigate(`/consult-cv/${row.EtudiantActId}`)}><DocumentScannerIcon /> </a>}

                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default withAuth(ConsultPublicAccounts, ["etudiant"]);