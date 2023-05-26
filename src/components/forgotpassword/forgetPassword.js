import React, { useEffect, useState } from "react";
import {
  changerPassEnseignant,
  changerPassAdmin,
  changerPassResponsable,
  changerPassEtudiant,
} from "../../api/api";
import "./style/style.css";
import { Select, MenuItem } from "@mui/material";

function ForgotPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    } else {
      setErrorMessage(null);
      switch (type) {
        case "enseignant":
          try {
            const response = await changerPassEnseignant(
              id,
              type,
              oldPassword,
              newPassword
            );
            setSuccessMessage("Mot de passe modifier avec succes");
          } catch (error) {
            console.error(error.response.data.message);
            if (
              error.response.data.message === "Current password is incorrect"
            ) {
              setErrorMessage(
                "L'ancien mot de passe est incorrecte veuiller le verifier"
              );
            }
          }
          break;
        case "responsable":
          try {
            const response = await changerPassResponsable(
              id,
              type,
              oldPassword,
              newPassword
            );
            setSuccessMessage("Mot de passe modifier avec succes");
          } catch (error) {
            console.error(error.response.data.message);
            if (
              error.response.data.message === "Current password is incorrect"
            ) {
              setErrorMessage(
                "L'ancien mot de passe est incorrecte veuiller le verifier"
              );
            }
          }
          break;
        case "etudiant":
          try {
            const response = await changerPassEtudiant(
              id,
              type,
              oldPassword,
              newPassword
            );
            setSuccessMessage("Mot de passe modifier avec succes");
          } catch (error) {
            console.error(error.response.data.message);
            if (
              error.response.data.message === "Current password is incorrect"
            ) {
              setErrorMessage(
                "L'ancien mot de passe est incorrecte veuiller le verifier"
              );
            }
          }
          break;
        case "admin":
          try {
            const response = await changerPassAdmin(
              id,
              type,
              oldPassword,
              newPassword
            );
            setSuccessMessage("Mot de passe modifier avec succes");
          } catch (error) {
            console.error(error.response.data.message);
            if (
              error.response.data.message === "Current password is incorrect"
            ) {
              setErrorMessage(
                "L'ancien mot de passe est incorrecte veuiller le verifier"
              );
            }
          }
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {
    console.log(id, type);
  }, [type]);
  return (
    <div className="form-container">
      <div className="error-placeholder">
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <div className="bottom-part">
        <div className="left-block">
          <img src=".\password-icon.png" alt="hi" />
          <h1 class="title-changer">Changer Mot De Passe</h1>
        </div>
        <div className="vl"></div>
        <div className="right-block">
          <form className="right-form" onSubmit={handleSubmit}>
            <div className="row">
              <input
                id="id"
                type="id"
                placeholder="write your id"
                className="passInput"
                value={id}
                onChange={(event) => setId(event.target.value)}
                required
              />
            </div>
            <div style={{ marginLeft: "2em", marginBottom: "1em" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                name="type"
                onChange={(event) => setType(event.target.value)}
                data-test="type"
                style={{ width: "18em" }}
                value={type}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"etudiant"}>Etudiant</MenuItem>
                <MenuItem value={"enseignant"}>Enseignant</MenuItem>
                <MenuItem value={"responsable"}>Responsable</MenuItem>
              </Select>
            </div>
            <div className="row">
              <input
                id="old-password"
                type="password"
                placeholder="Old password"
                className="passInput"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                required
              />
            </div>
            <div className="row">
              <input
                id="new-password"
                type="password"
                placeholder="New password"
                className="passInput"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </div>
            <div className="row">
              <input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm password"
                className="passInput"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                required
              />
            </div>
            <div className="button-grp">
              <button type="submit" className="changer">
                Changer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
