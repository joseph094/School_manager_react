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
  const response = await api.put(`/${role}`, myObj);
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





