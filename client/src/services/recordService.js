import axios from 'axios';
import { API_URL, API_ENDPOINTS } from './apiConfig';

export const calculateBMR = async (user_id) => {
  try {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.BMR}`, { user_id });
    return response.data;
  } catch (error) {
    throw error;
  }
};
