import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addMealToUser,getAllMeal } from '../../store/actions/authActions';

const DetailFood = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.user.userId);
    const { food, value, date } = route.params;

    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    const type = value;
    const Name = food.Name;
    const ration = food.ration ?? food.Ration;
    const Calories = (food.Calories * quantity).toFixed(2);
    const Protein = (food.Protein * quantity).toFixed(2);
    const Carbs = (food.Carbs * quantity).toFixed(2);
    const Fats = (food.Fats * quantity).toFixed(2);

    const handleAddMeal = () => {
        dispatch(addMealToUser(userId, Name, Calories, Protein, Carbs, Fats, type, date, ration, quantity))
          .then((response) => {
            if (response.type === 'ADD_MEAL_SUCCESS') {
              alert('Món ăn đã được thêm.');
              navigation.navigate('AddCalo',{date:date});
              dispatch(getAllMeal(userId));
            } else {
              alert(response.payload);
            }
          })
          .catch((error) => {
            alert('Đã xảy ra lỗi khi thêm món ăn. Vui lòng thử lại sau.');
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
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">Chi Tiết Món Ăn</Text>
            </View>

            <View className="flex ml-4">
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] my-2">
                    <Text className="text-white font-bold mr-5">Tên món:</Text>
                    <Text className="flex-1 text-white text-right">{Name}</Text>
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-4 my-2">
                    <Text className="text-white font-bold mr-5">Calories(kcal):</Text>
                    <Text className="flex-1 text-white text-right">{Calories} kcal</Text>
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-8 my-2">
                    <Text className="text-white font-bold mr-5">Carbohydrates(g):</Text>
                    <Text className="flex-1 text-white text-right">{Carbs} g</Text>
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-12 my-2">
                    <Text className="text-white font-bold mr-5">Fat(g):</Text>
                    <Text className="flex-1 text-white text-right">{Fats} g</Text>
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-16 my-2">
                    <Text className="text-white font-bold mr-5">Protein(g):</Text>
                    <Text className="flex-1 text-white text-right">{Protein} g</Text>
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-20 my-2">
                    <Text className="text-white font-bold mr-5">Khẩu phần:</Text>
                    <Text className="flex-1 text-white text-right">{ration}</Text>
                </View>


                {/* Quantity Section */}
                <View className="flex-row items-center justify-between bg-gray-900 p-3 rounded-l-[12px] ml-24 my-4 shadow-custom">
                    <Text className="text-white font-bold">Số lượng:</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            className="bg-red-400 p-1 rounded-full"
                            onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                            <Icon name="remove" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="mx-4 text-lg font-bold text-white">{quantity}</Text>
                        <TouchableOpacity
                            className="bg-green-400 p-1 rounded-full"
                            onPress={() => setQuantity(quantity + 1)}>
                            <Icon name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Add Meal Button */}
                <View className="items-end mt-4">
                    <TouchableOpacity
                        className="bg-green-400 p-4 rounded-l-[12px] ml-4 my-2 w-40 items-center justify-center"
                        onPress={handleAddMeal}>
                        <Text className="text-lg font-bold">Lấy nó</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DetailFood;
