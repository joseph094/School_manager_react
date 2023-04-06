import React, { useState } from 'react';
import {sighUpAlumni } from '../../api/api';
import "./style/style.css";

function SignupAlumni() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    formation: "",
    poste: "",
    email: "",
    mdp: "",
    confirmPassword: "",
    dateObtentionDiplome: "",
    dateEmbauche: "",
    vacation: false,
    contratExpert: false,
  });
  const [formError, setFormError] = useState("");
  const [inputDateNaisType, setInputDateNaisType] = useState("text");
  const [inputDateEmbType, setInputDateEmbType] = useState("text");
  const [inputDateObtType, setInputDateObtType] = useState("text");

  const handleFocus = (e) => {
    
    switch (e.target.name){

      case 'dateNaissance' : setInputDateNaisType("date");
        break;
      case 'dateObtentionDiplome' : setInputDateObtType("date");
        break;
      case 'dateEmbauche' : setInputDateEmbType("date");
        break;
      default : break;

    }
  };

  const handleBlur = (e) => {
    
    switch (e.target.name){
      case 'dateNaissance' : if (!e.target.value) { setInputDateNaisType("text");}
        break;
      case 'dateObtentionDiplome' : if (!e.target.value) { setInputDateObtType("text");}
        break;
      case 'dateEmbauche' : if (!e.target.value) { setInputDateEmbType("text");}
        break;
      default : break;
    }
    
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Check if passwords match
    if (formData.mdp !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    try {
        const etudiant = {
            EtudiantAluId: (formData.login).toString(),
            dateObtentionDiplome: formData.dateObtentionDiplome,
            dateEmbauche: formData.dateEmbauche,
            nom : formData.nom,
            prenom : formData.prenom,
            dateNaissance : formData.dateNaissance,
            formation : formData.formation,
            poste : formData.poste,
            login : Number(formData.login),
            mdp : formData.mdp,
            vacation : formData.vacation,
            ContratExpert : formData.contratExpert,
            verified : false
        };
        console.log(etudiant);
        const response = await sighUpAlumni(etudiant);
        console.log(response);
        //redirect to success page
        console.log('redirect');
  
    } catch (error) {
      if ((error.response.data.message).includes("duplicate key")){
        console.log('Login Already Existing');
        setFormError('Login Already Existing');
      }
      else{
        setFormError('Something Wrong Happened ... Try Again Later');
      }
      
    }
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
        <div className='signup-container'>
           {formError && <div className='error'>{formError}</div>}
          <div className='title'>
            <h1>Sign Up Alumni</h1>
          </div>
          <div className='form-group'>
            <form onSubmit={handleSubmit} className="form">
              <div className='top-part'>
                <div className='row-1'>
                  <input
                  className='signInput'
                  type="text"
                  name="nom"
                  id="nom"
                  required
                  placeholder='Nom'
                  value={formData.nom}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="text"
                  name="prenom"
                  id="prenom"
                  required
                  placeholder='Prenom'
                  value={formData.prenom}
                  onChange={handleChange}
                  />
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type={inputDateNaisType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name="dateNaissance"
                  id="dateNaissance"
                  required
                  placeholder='Date de Naissance'
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="text"
                  name="formation"
                  id="formation"
                  required
                  placeholder='Formation'
                  value={formData.formation}
                  onChange={handleChange}
                  />
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type="text"
                  name="poste"
                  id="poste"
                  required
                  placeholder='Poste'
                  value={formData.poste}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  />
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type='number'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="login"
                  name="login"
                  placeholder="login"
                  required
                  value={formData.login}
                  onChange={handleChange}/>
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type="password"
                  name="mdp"
                  id="mdp"
                  required
                  placeholder='Mot de Passe'
                  value={formData.mdp}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder='Confirmer le Mot de Passe'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  />
                </div>
                <div className='row-1'>
                  <input
                  className='signInput'
                  type={inputDateObtType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="dateObtentionDiplome"
                  name="dateObtentionDiplome"
                  required
                  placeholder="Date d'obtention du diplôme"
                  value={formData.dateObtentionDiplome}
                  onChange={handleChange}/>

                  <input
                  className='signInput'
                  type={inputDateEmbType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="dateEmbauche"
                  name="dateEmbauche"
                  placeholder="Date d'embauche"
                  onfocus="(this.type='date')"
                  value={formData.dateEmbacuhe}
                  onChange={handleChange}/>
                </div>

                <div className='row-2'>
                  <div className='boolean'>
                    <label className='label' htmlFor="vacation">
                    Vacation:
                    </label>
                    <input
                    type="checkbox"
                    className="checkbox"
                    id="vacation"
                    name="vacation"
                    checked={formData.vacation}
                    onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className='boolean'>
                    <label className='label' htmlFor="contratExpert">
                    Contrat Expert:
                    </label>
                    <input
                    type="checkbox"
                    className="checkbox"
                    id="contratExpert"
                    name="contratExpert"
                    checked={formData.contratExpert}
                    onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>
              <div className='bottom-part'>
                <button type="submit" className="btn">
                  S'inscrire
                </button>
                <p className='redirect'>Avez vous déja un compte?<span className='bold'> Connectez-vous</span></p>
              </div>
            </form>
          </div> 
        </div>
    )
};
    export default SignupAlumni;