import {
    GET_MEALS_SUCCESS,
    GET_MEALS_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    GET_RECORDS_SUCCESS,
    GET_RECORDS_FAILURE,
    ADD_MEAL_SUCCESS,
    ADD_MEAL_FAILURE,
    GET_FOODS_SUCCESS,
    GET_FOODS_FAILURE,
    ADD_YOUR_FOOD_SUCCESS,
    ADD_YOUR_FOOD_FAILURE,
    EDIT_FOOD_SUCCESS,
    EDIT_FOOD_FAILURE,
    DELETE_FOOD_SUCCESS,
    DELETE_FOOD_FAILURE,
    DELETE_MEAL_FOOD_FAILURE,
    DELETE_MEAL_FOOD_SUCCESS

} from './types';

import {
    login,
    register,
    getAllRecords,
    addMeal,
    getAllMeals,
    getAllFoods,
    editYourFood,
    deleteYourFood,
    addYourFood,
    deleteMeal
} from '../../services/authService';
import jwtDecode from 'jwt-decode';


const handleError = (error) => {
    return error.response ? error.response.data.msg : error.message;
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await login(email, password);
        if (response && response.token) {
            const decoded = jwtDecode(response.token);
            console.log(decoded);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token: response.token, user: decoded },
            });
            return { type: LOGIN_SUCCESS, payload: { token: response.token, user: decoded } };
        } else {
            const errorMessage = 'Invalid login credentials';
            dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
            return { type: LOGIN_FAILURE, payload: errorMessage };
        }
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        return { type: LOGIN_FAILURE, payload: errorMessage };
    }
};

export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        const response = await register(name, email, password);
        if (response) {
            dispatch({ type: REGISTER_SUCCESS, payload: response });
            return { type: REGISTER_SUCCESS, payload: response };
        }
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        return { type: REGISTER_FAILURE, payload: errorMessage };
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};

export const fetchUserRecords = (userId) => async (dispatch) => {
    try {
        const records = await getAllRecords(userId);
        dispatch({ type: GET_RECORDS_SUCCESS, payload: records });
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: GET_RECORDS_FAILURE, payload: errorMessage });
    }
};

export const addMealToUser = (userId, Name, Calories, Protein, Carbs, Fats, type, date, ration, quantity) => async (dispatch) => {
    try {
        const response = await addMeal(userId, Name, Calories, Protein, Carbs, Fats, type, date, ration, quantity);
        dispatch({
            type: ADD_MEAL_SUCCESS,
            payload: response,
        });
        return { type: ADD_MEAL_SUCCESS, payload: response };
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({
            type: ADD_MEAL_FAILURE,
            payload: errorMessage,
        });
        return { type: ADD_MEAL_FAILURE, payload: errorMessage };
    }
};

export const getAllMeal = (userId) => async (dispatch) => {
    try {
        const meals = await getAllMeals(userId);
        dispatch({ type: GET_MEALS_SUCCESS, payload: meals });
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: GET_MEALS_FAILURE, payload: errorMessage });
    }
};

export const getAllFood = (userId) => async (dispatch) => {
    try {
        const foods = await getAllFoods(userId);
        dispatch({ type: GET_FOODS_SUCCESS, payload: foods });
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: GET_FOODS_FAILURE, payload: errorMessage });
    }
};
export const addFoodToUser = (userId, Name, Calories, Protein, Carbs, Fats, ration, quantity) => async (dispatch) => {
    try {
        const response = await addYourFood(userId, Name, Calories, Protein, Carbs, Fats, ration, quantity);
        dispatch({
            type: ADD_YOUR_FOOD_SUCCESS,
            payload: response,
        });
        return { type: ADD_YOUR_FOOD_SUCCESS, payload: response };
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({
            type: ADD_YOUR_FOOD_FAILURE,
            payload: errorMessage,
        });
        return { type: ADD_YOUR_FOOD_FAILURE, payload: errorMessage };
    }
};

export const editFoodForUser = (userId, foodId, updatedFood) => async (dispatch) => {
    try {
        const response = await editYourFood(userId, foodId, updatedFood);
        dispatch({
            type: EDIT_FOOD_SUCCESS,
            payload: response,
        });
        return { type: EDIT_FOOD_SUCCESS, payload: response };
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: EDIT_FOOD_FAILURE, payload: errorMessage });
        return { type: EDIT_FOOD_FAILURE, payload: errorMessage };
    }
};

export const deleteFoodFromUser = (userId, foodId) => async (dispatch) => {
    try {
        const response = await deleteYourFood(userId, foodId);

        if (response && response.success) { 
            dispatch({
                type: DELETE_FOOD_SUCCESS,
                payload: foodId,
            });
            return { type: DELETE_FOOD_SUCCESS, payload: foodId };
        } else {
            const errorMessage = response?.message || 'Failed to delete food item';
            dispatch({ type: DELETE_FOOD_FAILURE, payload: errorMessage });
            return { type: DELETE_FOOD_FAILURE, payload: errorMessage };
        }
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: DELETE_FOOD_FAILURE, payload: errorMessage });
        return { type: DELETE_FOOD_FAILURE, payload: errorMessage };
    }
};

export const deleteFoodMealFromUser = (userId, foodId) => async (dispatch) => {
    try {
        const response = await deleteMeal(userId, foodId);

        if (response && response.success) { 
            dispatch({
                type: DELETE_MEAL_FOOD_SUCCESS,
                payload: foodId,
            });
            return { type: DELETE_MEAL_FOOD_SUCCESS, payload: foodId };
        } else {
            const errorMessage = response?.message || 'Failed to delete food item';
            dispatch({ type: DELETE_MEAL_FOOD_FAILURE, payload: errorMessage });
            return { type: DELETE_MEAL_FOOD_FAILURE, payload: errorMessage };
        }
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: DELETE_MEAL_FOOD_FAILURE, payload: errorMessage });
        return { type: DELETE_MEAL_FOOD_FAILURE, payload: errorMessage };
    }
};

