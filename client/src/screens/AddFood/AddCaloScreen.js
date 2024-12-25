import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import DateSelector from '../Home/Components/DateSelector';
import { useSelector } from 'react-redux';
import moment from 'moment';
import MealCard from './component/MealCard';
import Dishes from './component/Dishes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddCalo = ({ navigation }) => {
  const kcal = useSelector((state) => state.record.data.calories);
  const progress = 200 / kcal;

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const currentDate = moment(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    currentDate.clone().startOf('week').add(i, 'days')
  );
  // Dishes Data
  const dishes = [
    {
      id: 1,
      name: 'Trứng chiên',
      iconName: 'egg',
      calories: 100,
      fat: 7,
      protein: 6,
      carb: 1,
      date: "2024-12-23",
      ration: 'silce',
      type: 'Breakfast',
      quantity: 1
    },
    {
      id: 2,
      name: 'Bánh mì',
      iconName: 'bread-slice',
      calories: 250,
      fat: 2,
      protein: 9,
      carb: 45,
      date: "2024-12-22",
      ration: 'silce',
      type: 'Breakfast',
      quantity: 1
    },
    {
      id: 3,
      name: 'Cơm gà',
      iconName: 'rice',
      calories: 600,
      fat: 20,
      protein: 40,
      carb: 80,
      date: "2024-12-24",
      ration: 'dish',
      type: 'Lunch',
      quantity: 1
    },
    {
      id: 4,
      name: 'Salad trái cây',
      iconName: 'fruit-grapes-outline',
      calories: 150,
      fat: 1,
      protein: 2,
      carb: 30,
      date: "2024-12-22",
      ration: 'dish',
      type: 'Lunch',
      quantity: 1
    },
    {
      id: 5,
      name: 'Sữa chua',
      iconName: 'cup-outline',
      calories: 90,
      fat: 3,
      protein: 5,
      carb: 10,
      date: "2024-12-25",
      ration: 'box',
      type: 'Snack',
      quantity: 1
    },
    {
      id: 6,
      name: 'Cá hồi nướng',
      iconName: 'fish',
      calories: 400,
      fat: 20,
      protein: 50,
      carb: 0,
      date: "2024-12-22",
      ration: 'slice',
      type: 'Dinner',
      quantity: 1
    },
  ];

  // Filter dishes by ration (Breakfast, Lunch, Snack, Dinner)
  const breakfastDishes = dishes.filter((dish) => dish.type === 'Breakfast' && dish.date === selectedDate);
  const lunchDishes = dishes.filter((dish) => dish.type === 'Lunch' && dish.date === selectedDate);
  const snackDishes = dishes.filter((dish) => dish.type === 'Snack' && dish.date === selectedDate);
  const dinnerDishes = dishes.filter((dish) => dish.type === 'Dinner' && dish.date === selectedDate);


  return (
    <View className="flex-1 bg-[#1a202c] px-4 py-6">
      <SafeAreaView>
        <Text className="text-white text-xl font-bold mb-6">Nhật ký</Text>
      </SafeAreaView>

      {/* Horizontal Date Selector */}
      <DateSelector
        weekDays={weekDays}
        selectedDate={selectedDate}
        handleDateSelect={handleDateSelect}
      />

      {/* Calories Section */}
      <View className="mb-6">
        <Text className="text-gray-400 text-center text-sm">
          {currentDate.format('dddd, DD MMMM YYYY')}
        </Text>
        <View className="flex-row justify-between">
          <Text className="text-green-400 text-sm">BUDGET</Text>
          <Text className="text-white text-sm">{kcal}</Text>
        </View>
        <ProgressBar
          progress={progress}
          color="#388E3C"
          className="my-2 h-3 rounded-lg border-[2px] border-white"
        />
<View>
  {/* First Row */}
  <View className="flex-row justify-between items-center mb-2">
    <View className="flex-row items-center space-x-2">
      <Icon name="food-drumstick" size={20} color="blue" />
      <Text className="text-blue-400 text-sm">Thức ăn</Text>
      <Text className="text-white text-sm">2000</Text>
    </View>
    <View className="flex-row items-center space-x-2">
      <Icon name="dumbbell" size={20} color="yellow" />
      <Text className="text-yellow-400 text-sm">Tập luyện</Text>
      <Text className="text-white text-sm">200</Text>
    </View>
  </View>

  {/* Second Row */}
  <View className="flex-row justify-between items-center">
    <View className="flex-row items-center space-x-2">
      <Icon name="check-circle-outline" size={20} color="green" />
      <Text className="text-green-400 text-sm">Đã thực hiện</Text>
      <Text className="text-white text-sm">200</Text>
    </View>
    <View className="flex-row items-center space-x-2">
      <Icon name="timer-outline" size={20} color="red" />
      <Text className="text-red-400 text-sm">Còn lại</Text>
      <Text className="text-white text-sm">1718</Text>
    </View>
  </View>
</View>


      </View>

      {/* Meal Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <MealCard
          iconName="bread-slice" // Toast icon for breakfast
          mealName="Bữa Sáng"
          onPress={() => navigation.navigate('AddFood', { value: 'Breakfast' })}
        />
        <Dishes
          typeDishes={breakfastDishes}
        />
        <MealCard
          iconName="food-drumstick" // Drumstick icon for lunch
          mealName="Bữa Trưa"
          onPress={() => navigation.navigate('AddFood', { value: 'Lunch' })}

        />
        <Dishes
          typeDishes={lunchDishes}
        />
        <MealCard
          iconName="food-apple" // Apple icon for snack
          mealName="Bữa Phụ"
          onPress={() => navigation.navigate('AddFood', { value: 'Snack' })}
        />
        <Dishes
          typeDishes={snackDishes}
        />
        <MealCard
          iconName="silverware-fork-knife" // Fork and knife icon for dinner
          mealName="Bữa Tối"
          onPress={() => navigation.navigate('AddFood', { value: 'Dinner' })}
        />
        <Dishes
          typeDishes={dinnerDishes}
        />
        <MealCard
          iconName="dumbbell" // Dumbbell icon for workout
          mealName="Tập Luyện"
          onPress={() => console.log('Workout')}
        />
      </ScrollView>
    </View>
  );
};

export default AddCalo;
