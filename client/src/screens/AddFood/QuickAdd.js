import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addMealToUser,getAllMeal } from '../../store/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

const QuickAdd = ({ route, navigation }) => {
    const { title, type,date } = route.params;
    const dispatch = useDispatch();
    
    // Define state for each input field
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [protein, setProtein] = useState('');
    const [ration, setRation] = useState('');
    const [quantity, setQuantity] = useState('');
    const userId = useSelector((state) => state.auth.user.user.userId);
    const [Name] = useState('Món Nhanh');  // Static name, change if needed.

    const handleAddFoodToUser = () => {
        dispatch(addMealToUser(userId, Name, calories, protein, carbs, fats, type, date, ration, quantity))
            .then((response) => {
                if (response.type === 'ADD_MEAL_SUCCESS') {
                    alert('Món ăn đã được thêm.');
                    dispatch(getAllMeal(userId));
                    navigation.navigate('AddCalo',{date:date});
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
            <SafeAreaView className="flex-row items-center mb-4">
                <TouchableOpacity
                    className="p-2"
                    onPress={() => navigation.goBack()} >
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">{title}</Text>
            </SafeAreaView>
            <View className="flex ml-4 ">
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] my-2">
                    <Text className="text-white font-bold mr-5">Calories(kcal):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 284.64 kcal"
                        value={calories}
                        onChangeText={setCalories}
                        placeholderTextColor="gray"
                        keyboardType="numeric"  // To restrict to numbers
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-4 my-2">
                    <Text className="text-white font-bold mr-5">Carbohydrates(g):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 35.66 g"
                        value={carbs}
                        onChangeText={setCarbs}
                        placeholderTextColor="gray"
                        keyboardType="numeric"  // To restrict to numbers
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-8 my-2">
                    <Text className="text-white font-bold mr-5">Fat(g):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 10.37 g"
                        value={fats}
                        onChangeText={setFats}
                        placeholderTextColor="gray"
                        keyboardType="numeric"  // To restrict to numbers
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-12 my-2">
                    <Text className="text-white font-bold mr-5">Protein(g):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 12.19 g"
                        value={protein}
                        onChangeText={setProtein}
                        placeholderTextColor="gray"
                        keyboardType="numeric"  // To restrict to numbers
                    />
                </View>

                <View className="items-end mt-4">
                    <TouchableOpacity
                        className="bg-green-400 p-4 rounded-l-[12px] ml-4 my-2 w-40 items-center justify-center"
                        onPress={handleAddFoodToUser}  // Change here: reference function
                    >
                        <Text className="text-lg font-bold">
                            Thêm món ăn
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default QuickAdd;
