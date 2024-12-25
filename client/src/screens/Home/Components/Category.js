import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Category = ({navigation}) => (
    <View className="flex-row flex-wrap justify-between">
    {/* Menu Suggestion */}
    <TouchableOpacity
       onPress={() => navigation.navigate('test')}
      className="bg-green-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
        <Text className="text-white text-2xl font-bold">Menu</Text>
        <Text className="text-white text-2xl font-bold">Suggestion</Text>
      </View>
      <View className="flex items-end">
        <Icon name="restaurant-outline" size={50} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    {/* Add Calories */}
    <TouchableOpacity
     onPress={() => navigation.navigate('AddCalo')}
      className="bg-yellow-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
        <Text className="text-white text-2xl font-bold">Add</Text>
        <Text className="text-white text-2xl font-bold">Calories</Text>
      </View>
      <View className="flex items-end">
        <Icon name="fast-food-outline" size={50} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    {/* Track Goal */}
    <TouchableOpacity
      onPress={() => navigation.navigate('TrackGoal')}
      className="bg-rose-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
      <Text className="text-white text-2xl font-bold">Track</Text>
      <Text className="text-white text-2xl font-bold">Goal</Text>
      </View>
      <View className="flex items-end">
        <Icon name="flag-outline" size={50} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    {/* Other Meal Plans */}
    <TouchableOpacity
      onPress={() => console.log('Other Meal Plans clicked')}
      className="bg-orange-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
        <Text className="text-white text-2xl font-bold">Other</Text>
        <Text className="text-white text-2xl font-bold">Meal Plans</Text>
      </View>
      <View className="flex items-end">
        <Icon name="file-tray-outline" size={50} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  </View>
);

export default Category;
