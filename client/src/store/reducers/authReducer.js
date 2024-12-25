import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT, GET_RECORDS_SUCCESS, GET_RECORDS_FAILURE} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  records: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
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
