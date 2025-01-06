import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Dishes = ({ typeDishes, onDeleteDish }) => {
  return (
    <View className="pb-4">
      {typeDishes.map((dish) => (
        <View
          key={dish._id}
          className="flex-row justify-between items-center bg-[#2c3e50] p-2 rounded-lg mb-2 w-full"
        >
          <View className="items-start">
            <Text className="text-white w-56 font-bold">{dish.Name}</Text>
            {dish.quantity && dish.ration && (
              <Text className="text-white">
                {dish.quantity} {dish.ration}
              </Text>
            )}
          </View>
          <View className="flex-row items-center">
            <Text className="text-white font-bold mr-2">{dish.Calories} kcal</Text>
            <TouchableOpacity
              onPress={() => onDeleteDish(dish._id)}
              className="p-2 bg-red-500 rounded-lg"
            >
              <Icon name="delete" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Dishes;
