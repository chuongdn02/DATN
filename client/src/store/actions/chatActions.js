// actions/chatActions.js

import { chat } from '../../services/chatService';
import { SET_LOADING, SEND_MESSAGE, RECEIVE_MESSAGE } from './types';

// Gửi tin nhắn
export const sendMessage = (message) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    // Gọi API chat
    const response = await chat(message);
    dispatch({
      type: SEND_MESSAGE,
      payload: message,
    });
    dispatch({
      type: RECEIVE_MESSAGE,
      payload: response,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false }); 
  }
};
