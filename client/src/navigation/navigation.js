import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import GetInfoScreen from '../screens/GetInfo/GetInfoScreen';
import GetActivityScreen from '../screens/GetInfo/GetActivityScreen';
import GetGoalScreen from '../screens/GetInfo/GetGoalScreen';
import TabNavigator from './HomeRoutes/TabNavigator';
import SummaryScreen from '../screens/GetInfo/SummaryScreen';
import TrackGoalScreen from '../screens/Function/TrackGoalScreen';
import AddCaloScreen from '../screens/AddFood/AddCaloScreen';
import CreatePostScreen from '../screens/Home/Blog/CreatePostScreen';
import NewScreen from '../screens/Home/Blog/NewScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome"
    screenOptions={{
      headerShown: false,
      // gestureEnabled: false,
    }}
    >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="GetInfo" component={GetInfoScreen} />
        <Stack.Screen name="GetActivity" component={GetActivityScreen} />
        <Stack.Screen name="GetGoal" component={GetGoalScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="TrackGoal" component={TrackGoalScreen} />
        <Stack.Screen name="AddCalo" component={AddCaloScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />

        <Stack.Screen name="News" component={NewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default AppNavigator;
