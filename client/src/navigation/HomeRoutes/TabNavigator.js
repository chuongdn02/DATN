import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ProfileScreen from '../../screens/Home/ProfileScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import SettingsScreen from '../../screens/Home/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Notifications':
              iconName = 'notifications-outline';
              break;
            case 'Setting':
              iconName = 'camera-outline';
              break;
          }

          return (
            <View className="relative flex items-center justify-center w-12 h-12">
              {focused && (
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0)']}
                  className="absolute top-[8px] w-14 h-14 rounded-t-[90px]"
                />
              )}
              <Ionicons name={iconName} size={30} color={focused ? '#fff' : '#7f7f7f'} />
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#000',  // Màu chữ khi tab được chọn (focused)
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#3a3a3c',
          borderRadius: 30,
          height: 60,
          position: 'absolute',
          margin: 10,
          left: 10,
          right: 10,
          bottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
