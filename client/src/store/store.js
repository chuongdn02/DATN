import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
import recordReducer from './reducers/recordReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    record: recordReducer,
  },
});

export default store;
