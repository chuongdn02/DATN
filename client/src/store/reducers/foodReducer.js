import {
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_SUCCESS,
  FETCH_FOODS_FAILURE,
  SUGGEST_FOODS_REQUEST,
  SUGGEST_FOODS_SUCCESS,
  SUGGEST_FOODS_FAILURE,
} from '../actions/types';

const initialState = {
  foods: [], 
  suggestedFoods: [],
  loading: false,
  error: null, 
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOODS_REQUEST:
    case SUGGEST_FOODS_REQUEST:
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
    case SUGGEST_FOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestedFoods: action.payload,
      };
    case FETCH_FOODS_FAILURE:
    case SUGGEST_FOODS_FAILURE:
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
