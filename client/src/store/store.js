import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
import recordReducer from './reducers/recordReducer';
import foodReducer from './reducers/foodReducer';
import exercisesReducer from './reducers/exerciseReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    record: recordReducer,
    foods: foodReducer,
    exercises: exercisesReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 40,
        enabled: false,
      },
    }),
});

export default store;
