import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import './accounts.css'

function ConsultPublicAccounts() {
  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/etudiant/all", config);
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
        <div className="container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="table_head">Nom</th>
                <th className="table_head">Prénom</th>
                <th className="table_head">email</th>
                <th className="table_head">Date de naissance </th>
                <th className="table_head">Type</th>
                <th className="table_head">CV</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                if (row.visibilite === true) {
                  return (
                    <tr key={row.id}>
                      <td className="colonne">{row.nom}</td>
                      <td className="colonne" >{row.prenom}</td>
                      <td className="colonne">{row.email}</td>
                      <td className="colonne">{row.dateNaissance}</td>
                      {row.vacation!=null&&<td className="colonne">Alumni</td>}
                      {row.vacation==null&&<td className="colonne">Actuel</td>}
                      
                      <td className="colonne">
                        <i> cv </i>
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

export default ConsultPublicAccounts