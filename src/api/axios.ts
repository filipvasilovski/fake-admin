import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
