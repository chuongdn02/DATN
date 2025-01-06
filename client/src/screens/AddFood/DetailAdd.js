import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addFoodToUser, getAllFood } from '../../store/actions/authActions';

const DetailAdd = ({ navigation, route }) => {
    const { foodName, portion, quantity,type,date } = route.params;
    const userId = useSelector((state) => state.auth.user.user.userId);
    
    // Set initial states for calories, protein, carbs, and fats
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    
    const dispatch = useDispatch();

    const handleAddFoodToUser = () => {
        if (!calories || !protein || !carbs || !fats) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
        } else {
            dispatch(addFoodToUser(userId, foodName, calories, protein, carbs, fats, portion, quantity))

                .then((response) => {
                    if (response.type === 'ADD_YOUR_FOOD_SUCCESS') {
                        alert('Món ăn đã được thêm.');
                        dispatch(getAllFood(userId));
                        navigation.navigate('AddFood',{ value: type, date: date});
                    } else {
                    
                        alert(response.payload);
                    }
                })
                .catch((error) => {
                    alert('Đã xảy ra lỗi khi thêm món ăn. Vui lòng thử lại sau.');
                });
        }
    };

    return (
        <View className="bg-[#1a202c] flex-1">
            <View className="flex-row items-center mb-4 mt-14">
                <TouchableOpacity 
                    className="p-2"
                    onPress={() => navigation.goBack()} >
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">Chi tiết món ăn</Text>
            </View>
            <View className="flex ml-4 ">
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] my-2">
                    <Text className="text-white font-bold mr-5">Calories(kcal):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 284.64 kcal"
                        placeholderTextColor="gray"
                        value={calories}
                        onChangeText={setCalories}
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-4 my-2">
                    <Text className="text-white font-bold mr-5">Carbohydrates(g):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 35.66 g"
                        placeholderTextColor="gray"
                        value={carbs}
                        onChangeText={setCarbs}
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-8 my-2">
                    <Text className="text-white font-bold mr-5">Fat(g):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 10.37 g"
                        placeholderTextColor="gray"
                        value={fats}
                        onChangeText={setFats}
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-12 my-2">
                    <Text className="text-white font-bold mr-5">Protein(g):</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. 12.19 g"
                        placeholderTextColor="gray"
                        value={protein}
                        onChangeText={setProtein}
                    />
                </View>

                <View className="items-end mt-4">
                    <TouchableOpacity 
                        className="bg-green-400 p-4 rounded-l-[12px] ml-4 my-2 w-40 items-center justify-center"
                        onPress={handleAddFoodToUser}  // Call handleAddFoodToUser when pressed
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

export default DetailAdd;
