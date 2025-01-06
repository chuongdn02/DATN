export const API_URL = 'http://localhost:3000';
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_USER: '/auth',
  CHAT: '/api/chat',
  GET_ALL_RECORDS: '/auth/user/${userId}/records',
  BMR : '/api/calculate',
  GET_ALL_FOOD:'/food',
  GET_ALL_EXERCISE:'/exercise',
  ADD_MEAL: '/auth/users/${userId}/addMeal',
  SUGGEST_FOOD: '/food/suggest',
};
