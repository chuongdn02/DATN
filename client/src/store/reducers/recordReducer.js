import {
    CALCULATE_BMR_REQUEST,
    CALCULATE_BMR_SUCCESS,
    CALCULATE_BMR_FAILURE,
  } from '../actions/types';
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };

  const recordReducer = (state = initialState, action) => {
    switch (action.type) {
      case CALCULATE_BMR_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CALCULATE_BMR_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case CALCULATE_BMR_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export default recordReducer;
