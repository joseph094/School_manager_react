import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibWRwIjoiJGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTMscD00JHV6cXh6R2Jva2RYclVseGJlR2l1T0EkUXJJVUNtci9wVmNZTmU0Q1JyZTNTM2RyTnBpclNIdXFiNm9SVUhIUmdDdyIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTY3OTc1OTcwMSwiZXhwIjoxNjc5NzYwNjAxfQ.d9fsJYMNE55FmSKDCPGTV2oYa3FHpJx7E-qqDYcRTjs`,
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





