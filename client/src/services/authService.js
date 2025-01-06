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

export const getAllRecords = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/auth/users/${userId}/records`);
    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};



export const addMeal = async (userId, Name, Calories, Protein, Carbs, Fats, type, date, ration, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/auth/users/${userId}/addMeal`, { Name, Calories, Protein, Carbs, Fats, type, date, ration, quantity});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMeals = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/auth/users/${userId}/meals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const getAllFoods = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/auth/users/${userId}/yourFoods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const addYourFood = async (userId, Name, Calories, Protein, Carbs, Fats, ration, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/auth/users/${userId}/addYourFood`, { Name, Calories, Protein, Carbs, Fats, ration, quantity});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editYourFood = async (userId, foodId, Name, Calories, Protein, Carbs, Fats, ration, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/auth/users/${userId}/editYourFoods/${foodId}`, {
      Name,
      Calories,
      Protein,
      Carbs,
      Fats,
      ration,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error editing food:', error);
    throw error;
  }
};

export const deleteYourFood = async (userId, foodId) => {
  try {
    const response = await axios.delete(`${API_URL}/auth/users/${userId}/deleteYourFoods/${foodId}`);
    return response.data;
    
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;
  }
};

export const deleteMeal = async (userId, mealId) => {
  try {
    const response = await axios.delete(`${API_URL}/auth/users/${userId}/meals/${mealId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting food:', error.response || error);
    throw error;
  }
};
