import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg-all-5.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 bg-black/50 justify-end pb-10 items-center">
        <View className="mb-10 items-center">
          <Text className="text-white font-bold text-3xl tracking-wide">
            Best of <Text className="text-red-500 text-4xl">MENU</Text>
          </Text>
          <Text className="text-white font-bold text-3xl tracking-wide">
            For you
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')} // Điều hướng màn hình khác
          className="bg-rose-500 flex items-center justify-center mx-auto rounded-full h-14 w-80 border-[2px] border-neutral-200"
        >
          <Text className="text-white text-center tracking-widest font-bold text-xl">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
