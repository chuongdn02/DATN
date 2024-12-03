import axios from 'axios';
import { API_URL, API_ENDPOINTS } from './apiConfig';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.LOGIN}`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.REGISTER}`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GETUSER}`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Invalid data format received from server:', response.data);
      return [];
    }
  } catch (error) {
    throw error;
  }
};