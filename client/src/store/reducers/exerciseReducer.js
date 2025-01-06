import {
    GET_EXERCISES_SUCCESS,
    GET_EXERCISES_FAILURE
} from '../actions/types';

const initialState = {
    exercises: [],   
    loading: true, 
    error: null     
};

export const exercisesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXERCISES_SUCCESS:
            return {
                ...state,
                exercises: action.payload, 
                loading: false,
                error: null 
            };
        case GET_EXERCISES_FAILURE:
            return {
                ...state,
                exercises: [], 
                loading: false, 
                error: action.payload 
            };
        default:
            return state;
    }
};

export default exercisesReducer;