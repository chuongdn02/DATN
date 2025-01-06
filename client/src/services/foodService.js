import axios from 'axios';
import { API_URL, API_ENDPOINTS } from './apiConfig';

export const getAllFoods = async () => {
    try {
      const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ALL_FOOD}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  };

  export const suggestFoods = async (criteria) => {
    try {
      const response = await axios.post(`${API_URL}${API_ENDPOINTS.SUGGEST_FOOD}`, criteria);
      return response.data.meals;  // Lấy dữ liệu món ăn từ 'meals'
    } catch (error) {
      console.error('Error suggesting foods:', error);
      throw error;
    }
  };
  
  