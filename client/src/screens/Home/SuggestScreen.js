import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suggestFoodAction } from '../../store/actions/foodAction';
import { addMealToUser ,getAllMeal} from '../../store/actions/authActions';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const SuggestScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { suggestedFoods, loading, error } = useSelector((state) => state.foods);
  const userId = useSelector((state) => state.auth.user.user.userId);
  const [criteria, setCriteria] = useState({
    calories: 3000,
    carbs: 400,
    fats: 100,
    protein: 200,
  });
  const date = new Date();
  const currentDate = moment(date).format('YYYY-MM-DD');

  const [toggledMeals, setToggledMeals] = useState({});

  const handleSuggestClick = () => {
    dispatch(suggestFoodAction(criteria));
  };

  const handleToggleMeal = (mealType) => {
    setToggledMeals((prevToggledMeals) => ({
      ...prevToggledMeals,
      [mealType]: !prevToggledMeals[mealType],
    }));
  };

  const mealNames = {
    Breakfast: 'Bữa sáng',
    Lunch: 'Bữa trưa',
    Dinner: 'Bữa tối',
    Snack: 'Bữa phụ',
  };

  useEffect(() => {
    dispatch(suggestFoodAction(criteria));
  }, [criteria, dispatch]);

  const handleAddThisMeal = (mealType) => {
    const foods = suggestedFoods[mealType];
    let isAlertShown = false;
    let successMessage = 'Món ăn đã được thêm.'; 
    let errorMessage = '';
  
    foods.forEach((food) => {
      dispatch(addMealToUser(userId, food.Name, food.Calories, food.Protein, food.Carbs, food.Fats, food.Type, currentDate, food.Ration, 1))
        .then((response) => {
          if (response.type === 'ADD_MEAL_SUCCESS') {
            dispatch(getAllMeal(userId));
            if (!isAlertShown) {
              alert(successMessage);
              isAlertShown = true;
            }
          } else {
            errorMessage = `Lỗi khi thêm thực đơn ${food.Name}: ${response.payload}`;
          }
        })
        .catch((error) => {
          errorMessage = 'Đã xảy ra lỗi khi thêm thực đơn. Vui lòng thử lại sau.';
        })
        .finally(() => {
          if (errorMessage && !isAlertShown) {
            alert(errorMessage);
            isAlertShown = true;
          }
        });
    });
  };
  
  
  

  return (
    <View className="bg-[#1a202c] flex-1">
      <View className="flex-row items-center mb-4 mt-14">
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white flex-1 text-center right-6">Thực đơn hôm nay</Text>
      </View>

      <TouchableOpacity
        onPress={handleSuggestClick}
        disabled={loading}
        className="items-center justify-center"
      >
        <Text className="text-xs text-white mb-1">Chạm để thay đổi thực đơn</Text>  
        <Icon
          name="autorenew"
          size={30}
          color={loading ? "yellow" : "white"} 
        />
      </TouchableOpacity>

      <ScrollView>
        {loading && <ActivityIndicator size="large" color="#FF6F61" className="mt-4" />}
        {error && <Text className="text-red-500 mt-4 text-center">Error: {error}</Text>}

        {suggestedFoods && Object.keys(suggestedFoods).length > 0 ? (
          <View className="mt-6">
            {Object.keys(suggestedFoods).map((mealType) => (
              <View key={mealType} className="mb-6 border-b border-gray-300 pb-3">
                <TouchableOpacity onPress={() => handleToggleMeal(mealType)} className="flex-row items-center mb-2">
                  <Text className="text-2xl text-white ml-3 font-bold capitalize flex-1">
                    {mealNames[mealType.charAt(0).toUpperCase() + mealType.slice(1)]}
                  </Text>
                  <Icon
                    name={toggledMeals[mealType] ? 'expand-less' : 'expand-more'}
                    size={24}
                    color="white"
                    className="ml-2"
                  />
                </TouchableOpacity>

                {/* New Button to "Lấy thực đơn này" */}
                {toggledMeals[mealType] && (
                  <TouchableOpacity
                    onPress={() => handleAddThisMeal(mealType)}
                    className="mx-3 bg-green-400 p-2 rounded-lg items-center"
                  >
                    <Text className="text-white text-xs font-bold">Lấy thực đơn này</Text>
                    <Icon name="check-circle" size={24} color="white" className="mt-1" />
                  </TouchableOpacity>
                )}

                {toggledMeals[mealType] && (
                  <View>
                    {suggestedFoods[mealType].map((food) => (
                      <View key={food._id} className="bg-[#2c3e50] p-2 m-3 rounded-lg shadow-custom">
                        <View className="flex-row justify-between mb-2 items-center w-full">
                          <Text className="text-xl w-64 font-bold text-white">{food.Name}</Text>
                          <Text className="text-[#FFD700]">Calories: {food.Calories}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                          <Text className="text-[#32CD32]">Carbs: {food.Carbs}g</Text>
                          <Text className="text-[#FFA500]">Fats: {food.Fats}g</Text>
                          <Text className="text-[#FF4500]">Protein: {food.Protein}g</Text>
                        </View>

                        <View className="flex-row justify-start mt-2">
                          <Text className="text-white">Ration: {food.Ration}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          !loading && <Text className="text-center text-gray-500 text-lg mt-6">No suggestions available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SuggestScreen;
