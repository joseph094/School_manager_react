import axios from 'axios';

export const getToken = () => {
  return localStorage.getItem('token');
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
});


export const changerPassEnseignant = async (id,role, oldPassword, newPassword) => {
  const myObj = {
    id: id,
    oldmdp: oldPassword,
    mdp: newPassword
  };
  const response = await api.put(`/${role}/changepass`, myObj);
  return response.data;
};

export const changerPassResponsable = async (id,role, oldPassword, newPassword) => {
  const myObj = {
    id: id,
    oldmdp: oldPassword,
    mdp: newPassword
  };
  const response = await api.put(`/${role}/changepass`, myObj);
  return response.data;
};

export const changerPassEtudiant = async (id,role, oldPassword, newPassword) => {
  const myObj = {
    id: id,
    oldmdp: oldPassword,
    mdp: newPassword
  };
  const response = await api.put(`/${role}`, myObj);
  return response.data;
};

export const changerPassAdmin = async (id,role, oldPassword, newPassword) => {
  const myObj = {
    id: id,
    oldmdp: oldPassword,
    mdp: newPassword
  };
  const response = await api.put(`/${role}`, myObj);
  return response.data;
};

export const sighUpAlumni = async (formData) => {
const response = await api.post('/etudiant/auth/signup/alumni', formData);
return response.data;
}

export const getEtudiantAlumni = async (id) => {
  const response = await api.get(`/etudiant-alumni/${id}`);
  return response.data;
}

export const getUnverifiedAlumniAccounts = async () => {
  const response = await api.get('/etudiant-alumni/all');
  return response.data;
}

export const ValiderCompteAlu = async (id) => {
  
  const response = await api.put(`/etudiant-alumni/valider/${id}`);
  return response.data;
};

export const getGeneralStats = async () => {
  
  const response = await api.get(`/etudiant-alumni/stat`);
  return response.data;
};

export const getPaysStats = async () => {
  
  const response = await api.get(`/etudiant-alumni/paysstat`);
  return response.data;
};

export const getSocieteStats = async () => {
  
  const response = await api.get(`/etudiant-alumni/societestat`);
  return response.data;
};

export const GetUser = async (id,role) => {
  switch (role){
    case 'enseignant' :   
    try{
      const response = await api.get(`/enseignant/${id}`)
      return response.data;
    }catch(error){
      console.error(error.response.data.message);
    };
      break;
    case 'responsable' : try{ 
      const response = await api.get(`/responsable/${id}`)
      return response.data;
    }catch(error){
      console.error(error.response.data.message);
    };
      break;
    case 'admin' :  try{
      const response = await api.get(`/admin/${id}`)
      return response.data;
    }catch(error){
      console.error(error.response.data.message);
    };
      break;
    case 'etudiant' :  try{
      const response = await api.get(`/etudiant/${id}`)
      return response.data;
    }catch(error){
      console.error(error.response.data.message);
    };
      break;
  }
  
  
};



