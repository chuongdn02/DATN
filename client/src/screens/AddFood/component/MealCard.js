import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the MaterialCommunityIcons

const MealCard = ({ iconName, mealName, calories, onPress }) => {
  return (
    <View
      className="bg-[#1c1c2c] rounded-lg p-3 my-3 flex-row justify-between items-center border-[1px] border-green-400"
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 justify-center items-center mr-4">
          {iconName && <Icon name={iconName} size={30} color="#FFD700" />}
        </View>
        <View>
          <Text className="text-white text-xl font-bold">{mealName}</Text>
          <Text className="text-[#cccccc] text-sm mt-1">
            {calories ? calories : 0} kcal
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} className="bg-green-400 rounded-l-lg w-16 h-10 left-5 justify-center items-center">
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MealCard;
