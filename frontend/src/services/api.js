import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getEventos = (realizado) =>
  api.get('/eventos', { params: realizado === undefined ? {} : { realizado } })
     .then((res) => res.data);

export const getPregacoes = (pregadorId) =>
  api.get('/pregacoes', { params: pregadorId ? { pregadorId } : {} })
     .then((res) => res.data);

export const getPregadores = () =>
  api.get('/pregadores').then((res) => res.data);

export const getServicos = () =>
  api.get('/servicos').then((res) => res.data);

export const enviarContato = (dados) =>
  api.post('/contato', dados).then((res) => res.data);

export default api;
