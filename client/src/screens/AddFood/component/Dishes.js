import { View, Text } from 'react-native';
import React from 'react';

const Dishes = ({typeDishes}) => {
  return (
    <View className=" pb-4">
    {typeDishes.map((dish) => (
      <View key={dish.id} className="flex-row justify-between items-center bg-[#2c3e50] p-2 rounded-lg mb-2">
        <View className="items-start">
          <Text className="text-white ml-2">{dish.name}</Text>
          <Text className="text-white ml-2">{dish.quantity} {dish.ration}</Text>
        </View>
        <Text className="text-white">{dish.calories} kcal</Text>
      </View>
    ))}
  </View>
  );
};

export default Dishes;