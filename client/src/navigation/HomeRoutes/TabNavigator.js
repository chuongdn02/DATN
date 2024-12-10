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
                        case 'Blog':
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
                        <View className="flex items-center justify-center mt-5 h-12">
                            {focused && (
                                <LinearGradient
                                    colors={['#00FF00', '#00FF00', '#00FF00']}
                                    className="absolute  w-12 h-12 rounded-2xl "
                                />
                            )}
                            <Ionicons  name={iconName} size={25} color={focused ? '#1A2F55' : '#fff'} />
                        </View>
                    );
                },
                tabBarLabelStyle: {
                    fontSize: 8,
                    fontWeight: 'bold',
                    marginTop: 4,
                },
                tabBarActiveTintColor: '#000',  // Màu chữ khi tab được chọn (focused)
                tabBarInactiveTintColor: '#fff',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#1A2F55',
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#fff',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    shadowOffset: { width: 0, height: 5 },
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Blog" component={HomeScreen} />
            <Tab.Screen name="Notifications" component={ProfileScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={SettingsScreen} />
            <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
