// src/actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT } from './types';
import { login, register } from '../../services/authService';

const handleError = (error) => {
    return error.response ? error.response.data.msg : error.message;
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const user = await login(email, password);
        if (user && user.token) {
            dispatch({ type: LOGIN_SUCCESS, payload: user });
            return { type: LOGIN_SUCCESS, payload: user };
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
        const user = await register(name, email, password);
        dispatch({ type: REGISTER_SUCCESS, payload: user });
        return { type: REGISTER_SUCCESS, payload: user };
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        return { type: REGISTER_FAILURE, payload: errorMessage };
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};

