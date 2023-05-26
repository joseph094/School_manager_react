import axios from "axios";
import React, { useState } from "react";
import "./excel.css"
import withAuth from "../../hoc/hoc";
import { useNavigate } from "react-router-dom";

const Excel = () => {
  const [file, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleFileInput = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  }
  const isCsvOrXlsxFile = (fileName) => {
    return /\.(csv|xlsx)$/i.test(fileName);
  }
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios.post("http://localhost:3000/asset/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {
      navigate(`/getalletudiant`, { replace: true })
      console.log(response.data);

    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="import">
      <input type="file" onChange={handleFileInput} />

      {file && !isCsvOrXlsxFile(file.name) && (
        <div style={{ color: 'red' }}>Only CSV or XLSX files are allowed </div>

      )}{file && isCsvOrXlsxFile(file.name) && (
        <button className="importSubmit" data-test="import-submit" onClick={handleFileUpload} > Submit </button>
      )

      }
    </div>
  );
}

export default withAuth(Excel, ["admin", "DroitEtud"]);
