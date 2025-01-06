import {
  GET_MEALS_SUCCESS,
  GET_MEALS_FAILURE,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_FAILURE,
  GET_FOODS_SUCCESS,
  GET_FOODS_FAILURE,
  ADD_YOUR_FOOD_SUCCESS,
  ADD_YOUR_FOOD_FAILURE,
  EDIT_FOOD_SUCCESS,
  EDIT_FOOD_FAILURE,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_FAILURE,
  DELETE_MEAL_FOOD_SUCCESS,
  DELETE_MEAL_FOOD_FAILURE
} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  records: [],
  meals: [],
  foods: [],
  userFoods: [],
  userMeals: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case GET_RECORDS_SUCCESS:
      return {
        ...state,
        records: action.payload,
        error: null,
      };
    case GET_RECORDS_FAILURE:
      return {
        ...state,
        records: [],
        error: action.payload,
      };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        meals: [...state.meals, action.payload],
        error: null,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_MEALS_SUCCESS:
      return {
        ...state,
        userMeals: action.payload,
        error: null,
      };
    case GET_MEALS_FAILURE:
      return {
        ...state,
        userMeals: [],
        error: action.payload,
      };


    case GET_FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        error: null,
      };
    case GET_FOODS_FAILURE:
      return {
        ...state,
        foods: [],
        error: action.payload,
      };
    case ADD_YOUR_FOOD_SUCCESS:
      return {
        ...state,
        userFoods: [...state.userFoods, action.payload],
        error: null,
      };

    case ADD_YOUR_FOOD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_FOOD_SUCCESS:
      return {
        ...state,
        foods: state.foods.map(food =>
          food._id === action.payload._id ? action.payload : food
        ),
        error: null,
      };
    case EDIT_FOOD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        foods: state.foods.filter(food => food._id !== action.payload),
        error: null,
      };
    case DELETE_FOOD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_MEAL_FOOD_SUCCESS:
      return {
        ...state,
        meals: state.meals.filter(food => food._id !== action.payload),
        error: null,
      };
    case DELETE_MEAL_FOOD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

      case LOGOUT:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: null,
        };


    default:
      return state;
  }
};

export default authReducer;
