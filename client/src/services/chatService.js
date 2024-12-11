import axios from 'axios';
import { API_URL, API_ENDPOINTS } from './apiConfig';



export const chat = async (message) => {
  try {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.CHAT}`, { message });
    return response.content;
  } catch (error) {
    throw error;
  }
};
