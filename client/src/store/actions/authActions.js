// src/actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT } from './types';
import { login, register } from '../../services/authService';
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
        const response = await register(name, email, password); // Gửi yêu cầu đăng ký
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
