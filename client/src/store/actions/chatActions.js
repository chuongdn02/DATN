import { chat } from '../../services/chatService';
import { SET_LOADING, SEND_MESSAGE, RECEIVE_MESSAGE } from './types';

export const sendMessage = (message) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
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
