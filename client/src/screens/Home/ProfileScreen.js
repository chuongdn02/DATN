import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const ProfileScreen = () => {
  return (
    <ScrollView className=" bg-[#1a202c] flex-1 p-4">
      {/* Header */}
      <SafeAreaView className="items-center">
        <Text className="text-white text-2xl font-bold">Apple User</Text>
        <Text className="text-gray-400 text-sm">Lose Weight</Text>
      </SafeAreaView>

      <View className="bg-gray-900 mt-6 rounded-lg p-4" style={{ shadowColor: '#FFFFFF', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 5 }}>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Icon name="flag-outline" size={25} color="#FFFFFF" />
            <Text className="text-white ">Goal Weight</Text>
            <Text className="text-green-500 text-2xl font-bold">46.0 kg</Text>
          </View>
          <View className="items-center">
            <Icon name="clipboard-outline" size={25} color="#FFFFFF" />
            <Text className="text-white ">You've maintain weight</Text>
            <Text className="text-white text-2xl font-bold">0.0 kg</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="bg-gray-700 h-2 my-4 rounded-lg">
          <View className="bg-white h-2 w-[100%] rounded-lg" />
        </View>
        <Text className="text-center text-white font-bold text-lg">Current Weight: 51.0 kg</Text>
        <View className="items-end">
          <TouchableOpacity className="bg-teal-300 p-3 w-[60%] top-7 left-4 rounded-l-lg items-center">
            <Text className="text-black font-bold">Update Your Weight</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Section */}
      <View className="mt-6 bg-gray-900 p-3 rounded-lg">
        <Text className="text-white text-lg font-bold mb-4">Account</Text>
        {["Account Setting", "Delete Account", "Log Out", "Get Premium"].map((item) => (
          <TouchableOpacity
            key={item}
            className="bg-gray-800 p-4  rounded-sm border-gray-500 border-2"
          >
            <Text className="text-white">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Profile Settings */}
      <View className=" mt-2 bg-gray-900 p-3 rounded-lg">
        <Text className="text-white text-lg font-bold mb-4">Profile Settings</Text>
        {["Restore Purchase", "Subscription Information", "Edit Goals", "Reminder"].map((item) => (
          <TouchableOpacity
            key={item}
             className="bg-gray-800 p-4  rounded-sm border-gray-500 border-2"
          >
            <Text className="text-white">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
