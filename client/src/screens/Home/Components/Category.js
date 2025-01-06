import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Category = ({navigation,date}) => (
    <View className="flex-row flex-wrap justify-between">
    {/* Menu Suggestion */}
    <TouchableOpacity
       onPress={() => navigation.navigate('Suggest')}
      className="bg-green-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
        <Text className="text-white text-2xl font-bold">Gợi ý</Text>
      </View>
      <View className="flex items-end">
        <Icon name="restaurant-outline" size={80} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    {/* Add Calories */}
    <TouchableOpacity
     onPress={() => navigation.navigate('AddCalo',{date:date})}
      className="bg-yellow-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
        <Text className="text-white text-2xl font-bold">Thực Đơn</Text>
      </View>
      <View className="flex items-end">
        <Icon name="fast-food-outline" size={80} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    {/* Track Goal */}
    <TouchableOpacity
      onPress={() => navigation.navigate('TrackGoal')}
      className="bg-rose-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
      <Text className="text-white text-2xl font-bold">Mục tiêu</Text>
      </View>
      <View className="flex items-end">
        <Icon name="flag-outline" size={80} color="#FFFFFF" />
      </View>
    </TouchableOpacity>

    {/* Other Meal Plans */}
    <TouchableOpacity
      onPress={() => console.log('Other Meal Plans clicked')}
      className="bg-orange-400/80 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
    >
      <View>
        <Text className="text-white text-2xl font-bold">Chế độ ăn</Text>
      </View>
      <View className="flex items-end">
        <Icon name="file-tray-outline" size={80} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  </View>
);

export default Category;
