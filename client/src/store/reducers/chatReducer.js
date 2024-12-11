
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
          { text: action.payload, sender: 'user' }, // Gửi tin nhắn của người dùng
        ],
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { text: action.payload, sender: 'system' }, // Gửi phản hồi từ hệ thống
        ],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload, // Cập nhật trạng thái loading
      };
    default:
      return state;
  }
};

export default chatReducer;
