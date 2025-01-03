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
// import NewScreen from '../screens/Home/Blog/NewScreen';
import AddFood from '../screens/AddFood/AddFood';
import CreateFood from '../screens/AddFood/CreateFood';
import QuickAdd from '../screens/AddFood/QuickAdd';
import DetailAdd from '../screens/AddFood/DetailAdd';
import DetailFood from '../screens/AddFood/DetailFood';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animationEnabled: true, 
          gestureEnabled: true,
          animationTypeForReplace: 'push',
        }}

      >
        <Stack.Screen name="Root" component={TabNavigator} />
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
        <Stack.Screen name="AddFood" component={AddFood} />
        <Stack.Screen name="CrFood" component={CreateFood} />
        <Stack.Screen name="QAdd" component={QuickAdd} />
        <Stack.Screen name="DAdd" component={DetailAdd} />
        <Stack.Screen name="DFood" component={DetailFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
