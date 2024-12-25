
import { SEND_MESSAGE, RECEIVE_MESSAGE, SET_LOADING } from '../actions/types';

const initialState = {
  messages: [],
  loading: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { text: action.payload, sender: 'user' },
        ],
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { text: action.payload, sender: 'system' },
        ],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
