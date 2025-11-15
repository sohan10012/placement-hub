// API Service - handles all API calls to backend
import axios from 'axios';

const API_BASE_URL = 'https://feisty-gentleness-production-c2a9.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------------------- Students API ----------------------
export const studentsAPI = {
  getAll: () => api.get('/students'),
  getById: (id: number) => api.get(`/students/${id}`),
  create: (data: any) => api.post('/students', data),
  update: (id: number, data: any) => api.put(`/students/${id}`, data),
  delete: (id: number) => api.delete(`/students/${id}`),
};

// ---------------------- Companies API ----------------------
export const companiesAPI = {
  getAll: () => api.get('/companies'),
  getById: (id: number) => api.get(`/companies/${id}`),
  create: (data: any) => api.post('/companies', data),
  update: (id: number, data: any) => api.put(`/companies/${id}`, data),
  delete: (id: number) => api.delete(`/companies/${id}`),
};

// ---------------------- Placements API ----------------------
export const placementsAPI = {
  getAll: () => api.get('/placements'),
  getById: (id: number) => api.get(`/placements/${id}`),
  create: (data: any) => api.post('/placements', data),
  update: (id: number, data: any) => api.put(`/placements/${id}`, data),
  delete: (id: number) => api.delete(`/placements/${id}`),
};

// ---------------------- Trainings API ----------------------
export const trainingsAPI = {
  getAll: () => api.get('/trainings'),
  getById: (id: number) => api.get(`/trainings/${id}`),
  create: (data: any) => api.post('/trainings', data),
  update: (id: number, data: any) => api.put(`/trainings/${id}`, data),
  delete: (id: number) => api.delete(`/trainings/${id}`),
};

// ---------------------- Feedback API ----------------------
export const feedbackAPI = {
  getAll: () => api.get('/feedback'),
  getById: (id: number) => api.get(`/feedback/${id}`),
  create: (data: any) => api.post('/feedback', data),
  update: (id: number, data: any) => api.put(`/feedback/${id}`, data),
  delete: (id: number) => api.delete(`/feedback/${id}`),
};

export default api;
