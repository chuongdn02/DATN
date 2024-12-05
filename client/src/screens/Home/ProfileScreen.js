import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('');
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(Dimensions.get('window').width))[0];
  const name = useSelector((state) => state.auth.user.user?.name || 'Guest');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning,');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon,');
    } else {
      setGreeting('Good evening,');
    }
  }, []);

  const toggleNavbar = () => {
    if (isNavbarVisible) {
      // Hide Navbar
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setNavbarVisible(false));
    } else {
      // Show Navbar
      setNavbarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0C1B44]">
      {isNavbarVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            right: slideAnim,
            top: 0,
            bottom: 0,
            width: Dimensions.get('window').width * 0.75,
            backgroundColor: '#232429',
            zIndex: 50,
            padding: 20,
          }}
        >
          <SafeAreaView>
            <Text className="text-black text-xl font-bold mb-5">Good morning!</Text>
            <TouchableOpacity className="bg-blue-500 p-2 rounded-lg mb-5">
              <Text className="text-white text-center">Search</Text>
            </TouchableOpacity>

            {/* Favorite Apps Section */}
            <Text className="text-black text-lg font-bold mb-2">Favorite Apps</Text>
            <View>
              <Text className="text-white text-base mb-2">📷 Camera</Text>
              <Text className="text-white text-base mb-2">🖼️ Gallery</Text>
              <Text className="text-white text-base mb-2">📘 Facebook</Text>
              <Text className="text-white text-base mb-2">🌐 Google+</Text>
              <Text className="text-white text-base mb-2">🌍 Internet</Text>
            </View>

            {/* Settings Section */}
            <Text className="text-black text-lg font-bold mt-5 mb-2">Settings</Text>
            <View>
              <Text className="text-black text-base mb-2">🔅 Dark Mode</Text>
              <Text className="text-black text-base mb-2">📱 Nav Bar</Text>
              <Text className="text-black text-base mb-2">📶 Wi-Fi</Text>
            </View>

            {/* Back Button */}
            <TouchableOpacity onPress={toggleNavbar} className="mt-5">
              <Text className="text-blue-500 text-center">⬅️ Back</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Animated.View>
      )}

      {/* Main Screen */}
      <View className="flex-1 p-5 pb-20">
        <View className="flex-row items-center justify-between">
          <Image
            source={require('../../assets/images/person.png')}
            className="w-12 h-12 rounded-full mb-2 border-white border-[1px]"
          />
          <TouchableOpacity onPress={toggleNavbar}>
            <Icon name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-lg">{greeting}</Text>
        <Text className="text-white text-2xl font-bold">{name}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-white text-lg font-bold my-2">Recently played</Text>
          <View className="flex-row justify-between mb-5">
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={require('../../assets/images/bg-all.jpg')}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Daily calm</Text>
              <Text className="text-gray-400 text-sm">10 min</Text>
            </View>
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={require('../../assets/images/person.png')}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Stay happy</Text>
              <Text className="text-gray-400 text-sm">10 min</Text>
            </View>
          </View>

          {/* Favorites Section */}
          <Text className="text-white text-lg font-bold my-2">Your favorites</Text>
          <View className="flex-row justify-between mb-5">
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={{ uri: 'https://example.com/train-your-mind-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Train your mind</Text>
              <Text className="text-gray-400 text-sm">10 min</Text>
            </View>
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={{ uri: 'https://example.com/sunset-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Sunset vibes</Text>
              <Text className="text-gray-400 text-sm">10 min</Text>
            </View>
          </View>
          <Text className="text-white text-lg font-bold my-2">Explore more</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
            <View className="bg-[#1C2D5A] rounded-lg w-36 p-3 mr-3">
              <Image
                source={{ uri: 'https://example.com/explore-1-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Morning vibes</Text>
            </View>
            <View className="bg-[#1C2D5A] rounded-lg w-36 p-3 mr-3">
              <Image
                source={{ uri: 'https://example.com/explore-2-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Relaxation</Text>
            </View>
            <View className="bg-[#1C2D5A] rounded-lg w-36 p-3">
              <Image
                source={{ uri: 'https://example.com/explore-3-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Focus time</Text>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
