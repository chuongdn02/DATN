import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './src/navigation/navigation';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Provider } from 'react-redux';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider platform="ios">
        <Navigation />
      </TailwindProvider>
    </Provider>
  );
}


