import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NewScreen = ({ route, navigation }) => {
  // Destructuring data passed from the previous screen
  const { user, avatar, image } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-[#1a202c] p-4">
      <ScrollView>
        {/* Post Header */}
        <View className="flex-row items-center mb-4">
          <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full mr-2" />
          <Text className="text-white font-bold">{user}</Text>
        </View>

        {/* Post Content */}
 

        {/* Post Image */}
        {image && (
          <Image source={{ uri: image }} className="w-full h-60 rounded-lg mb-4" />
        )}

        {/* Interaction Section */}
        <View className="flex-row justify-between my-4">
          <View className="flex-row items-center">

          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-4">
          <Icon name="arrow-left" size={20} color="#FFFFFF" />
          <Text className="text-white ml-2">Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewScreen;
