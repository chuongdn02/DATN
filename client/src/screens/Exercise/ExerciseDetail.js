import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addMealToUser, getAllMeal } from '../../store/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
const ExerciseDetail = ({ route, navigation }) => {
    const { exercise, date } = route.params;
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [protein, setProtein] = useState('');
    const [ration, setRation] = useState('');
    const [quantity, setQuantity] = useState('');
    const userId = useSelector((state) => state.auth.user.user.userId);
    const [minutes, setMinutes] = useState(exercise.Minutes);
    const [calories, setCalories] = useState(exercise.Calories);
    const dispatch = useDispatch();
    const caloriesPerMinute = exercise.Calories / exercise.Minutes;


    const handleAddToJournal = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn thêm hoạt động này vào nhật ký không?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xác nhận",
                    onPress: () => {
                        dispatch(addMealToUser(userId, exercise.Name, calories, protein, carbs, fats, 'exercise',date, ration, quantity))
                            .then((response) => {
                                if (response.type === 'ADD_MEAL_SUCCESS') {
                                    alert('Hoạt động đã được thêm');
                                    navigation.navigate('AddCalo',{date:date});
                                    dispatch(getAllMeal(userId));
        
                                } else {
                                    alert(response.payload);
                                }
                            })
                            .catch((error) => {
                                alert('Đã xảy ra lỗi khi thêm món ăn. Vui lòng thử lại sau.');
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };


    const handleMinutesChange = (text) => {
        const newMinutes = parseInt(text, 10);

        if (!isNaN(newMinutes)) {
            setMinutes(newMinutes);
            const newCalories = newMinutes * caloriesPerMinute;
            setCalories(newCalories);
        } else {
            setMinutes(0);
            setCalories(0);
        }
    };

    return (
        <ScrollView className="flex-1 bg-[#1a202c] px-4 pt-14">
            <View className="flex-row items-center">
                <TouchableOpacity className="p-2 right-4" onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">
                    Chi tiết bài tập
                </Text>
            </View>

            {exercise.Image && (
                <Image
                    source={{ uri: exercise.Image }}
                    className="w-full h-48 mb-4 rounded-lg"
                />
            )}

            <Text className="text-2xl font-bold text-white text-center my-4">{exercise.Name}</Text>
            <Text className="text-lg font-semibold text-white">Loại bài tập: {exercise.Type}</Text>
            <Text className="text-base text-white mt-2">Lượng calo tiêu thụ: {calories.toFixed(2)} kcal</Text>

            <View className="flex-row justify-between mt-2">
                <Text className="text-base text-white">Thời gian thực hiện:</Text>
                <View className="flex-row items-center">
                    <TextInput
                        value={minutes.toString()}
                        onChangeText={handleMinutesChange}
                        keyboardType="numeric"
                        className="text-white bg-[#2d3748] rounded-lg px-4 py-2 w-24 text-center"
                    />
                    <Text className="text-base text-white ml-2">phút</Text>
                </View>
            </View>

            {exercise.Description && (
                <Text className="text-base text-white mt-4">{exercise.Description}</Text>
            )}

            <View className="mt-6 items-end">
                <TouchableOpacity
                    onPress={handleAddToJournal}
                    className="bg-green-400 py-3 rounded-l-[14px] w-44 left-4"
                >
                    <Text className="text-white text-lg font-semibold text-center">
                        Thêm vào nhật ký
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ExerciseDetail;
