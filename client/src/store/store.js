import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
import recordReducer from './reducers/recordReducer';
import foodReducer from './reducers/foodReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    record: recordReducer,
    foods: foodReducer
  },
});

export default store;
