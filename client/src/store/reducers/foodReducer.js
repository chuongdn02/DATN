import {
    FETCH_FOODS_REQUEST,
    FETCH_FOODS_SUCCESS,
    FETCH_FOODS_FAILURE,
  } from '../actions/types';
  
  const initialState = {
    foods: [], 
    loading: false,
    error: null, 
  };
  
  const foodReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FOODS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_FOODS_SUCCESS:
        return {
          ...state,
          loading: false,
          foods: action.payload,
        };
      case FETCH_FOODS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default foodReducer;
  