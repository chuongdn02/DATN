import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import DateSelector from '../Home/Components/DateSelector';
import moment from 'moment';
import MealCard from './component/MealCard';
import Dishes from './component/Dishes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMeal, deleteFoodMealFromUser } from '../../store/actions/authActions';

const AddCalo = ({ navigation, route }) => {
  const { date } = route.params;
  const kcal = useSelector((state) => state.record.data.calories);
  const dishes = useSelector((state) => state.auth.userMeals.meals);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.user.userId);
  const [selectedDate, setSelectedDate] = useState(
    date ? date : moment().format('YYYY-MM-DD')
  );

  const handleDateSelect = (dates) => setSelectedDate(dates);

  const currentDate = moment(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) => currentDate.clone().startOf('week').add(i, 'days'));

  const getDishesForMeal = (type) => {
    if (!dishes) return [];
    return dishes.filter(
      (dish) => dish.type === type && moment(dish.date).format('YYYY-MM-DD') === selectedDate
    );
  };

  const calculateTotalCalories = (dishesFood) => dishesFood.reduce((total, dish) => total + dish.Calories, 0);

  const breakfastDishes = getDishesForMeal('breakfast');
  const lunchDishes = getDishesForMeal('lunch');
  const dinnerDishes = getDishesForMeal('dinner');
  const snackDishes = getDishesForMeal('snack');
  const Exercises = getDishesForMeal('exercise');
  const consumedCalories = calculateTotalCalories(breakfastDishes) + calculateTotalCalories(lunchDishes) + calculateTotalCalories(dinnerDishes) + calculateTotalCalories(snackDishes);
  const workoutCalories = calculateTotalCalories(Exercises);
  const completedCalories = consumedCalories - workoutCalories;
  const remainingCalories = kcal - completedCalories;
  const progress = completedCalories / kcal;

  const handleNavigateToAddFood = (mealType) => {
    navigation.navigate('AddFood', {
      value: mealType,
      date: selectedDate,
    });
  };

  const handleDeleteDish = (dishId) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa món ăn này?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            dispatch(deleteFoodMealFromUser(userId, dishId))
              .then(() => {
                dispatch(getAllMeal(userId));
              })
              .catch((error) => {
                console.error('Error deleting dish:', error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View className="flex-1 bg-[#1a202c] px-4 ">
      <View className="mt-14 flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.navigate('Root')} className="p-2 right-6">
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white flex-1 right-6 text-center">Nhật ký</Text>
      </View>

      <DateSelector weekDays={weekDays} selectedDate={selectedDate} handleDateSelect={handleDateSelect} />

      {/* Calories Section */}
      <View className="mb-6">
        <Text className="text-gray-400 text-center text-sm">{currentDate.format('dddd, DD MMMM YYYY')}</Text>
        <View className="flex-row justify-between">
          <Text className="text-green-400 text-sm">Tiến độ</Text>
          <Text className="text-white text-sm">{kcal} (kcal)</Text>
        </View>
        <ProgressBar progress={progress} color="#388E3C" className="my-2 h-3 rounded-lg border-[2px] border-white" />
        <View className="mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center space-x-2">
              <Icon name="food-drumstick" size={20} color="blue" />
              <Text className="text-blue-400 text-sm">Thức ăn</Text>
              <Text className="text-white text-sm">{consumedCalories} (kcal)</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Icon name="dumbbell" size={20} color="yellow" />
              <Text className="text-yellow-400 text-sm">Tập luyện</Text>
              <Text className="text-white text-sm">{workoutCalories} (kcal)</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center space-x-2">
              <Icon name="check-circle-outline" size={20} color="green" />
              <Text className="text-green-400 text-sm">Đã thực hiện</Text>
              <Text
                className={`text-sm ${completedCalories > kcal ? 'text-red-500' : 'text-white'
                  }`}
              >
                {completedCalories}
              </Text>
              {/* <Text className="text-white text-sm">{completedCalories} (kcal)</Text> */}
            </View>
            <View className="flex-row items-center space-x-2">
              <Icon name="timer-outline" size={20} color="red" />
              <Text className="text-red-400 text-sm">Còn lại</Text>
              <Text className="text-white text-sm">{remainingCalories} (kcal)</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Meals and Dishes */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <MealCard
          iconName="bread-slice"
          mealName="Bữa sáng"
          calories={calculateTotalCalories(breakfastDishes)}
          onPress={() => handleNavigateToAddFood('breakfast')}
        />
        <Dishes typeDishes={breakfastDishes} onDeleteDish={handleDeleteDish} />

        <MealCard
          iconName="food-drumstick"
          mealName="Bữa trưa"
          calories={calculateTotalCalories(lunchDishes)}
          onPress={() => handleNavigateToAddFood('lunch')}
        />
        <Dishes typeDishes={lunchDishes} onDeleteDish={handleDeleteDish} />

        <MealCard
          iconName="silverware-fork-knife"
          mealName="Bữa tối"
          calories={calculateTotalCalories(dinnerDishes)}
          onPress={() => handleNavigateToAddFood('dinner')}
        />
        <Dishes typeDishes={dinnerDishes} onDeleteDish={handleDeleteDish} />

        <MealCard
          iconName="food-apple"
          mealName="Bữa phụ"
          calories={calculateTotalCalories(snackDishes)}
          onPress={() => handleNavigateToAddFood('snack')}
        />
        <Dishes typeDishes={snackDishes} onDeleteDish={handleDeleteDish} />
        
        <MealCard
          iconName="dumbbell"
          mealName="Tập luyện"
          calories={calculateTotalCalories(Exercises)}
          onPress={() => navigation.navigate('All_Ex', { date: selectedDate })}
     
        />
         <Dishes typeDishes={Exercises} onDeleteDish={handleDeleteDish} />
      </ScrollView>
    </View>
  );
};

export default AddCalo;
