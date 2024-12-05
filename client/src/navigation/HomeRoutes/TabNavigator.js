import React from 'react';
import { View } from 'react-native';
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
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Menu':
              iconName = 'grid-outline';
              break;
            case 'Notifications':
              iconName = 'notifications-outline';
              break;
            case 'Setting':
              iconName = 'settings-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }

          return (
            <View className="flex items-center justify-center w-12 h-12">
              {focused && (
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0)']}
                  className="absolute top-[8px] w-14 h-14 rounded-t-[90px]"
                />
              )}
              <Ionicons name={iconName} size={30} color={focused ? '#7f7f7f' : '#fff'} />
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
          backgroundColor: '#1A2F55',
          height: 70,
          justifyContent:'center',
          alignItems:'center',
          shadowColor: '#fff',
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 5 },
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Menu" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
