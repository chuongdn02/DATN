import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateFood = ({ navigation }) => {
    const [foodName, setFoodName] = useState('');
    const [portion, setPortion] = useState('');
    const [quantity, setQuantity] = useState('1');

    const handleAddFood = () => {
        // Validate if all fields are filled
        if (!foodName || !portion || !quantity) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
        } else {
            // Pass the data to DAdd screen
            navigation.navigate('DAdd', {
                foodName,
                portion,
                quantity
            });
        }
    };

    return (
        <View className="bg-[#1a202c] flex-1">
            <SafeAreaView className="flex-row items-center mb-4">
                <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">Tạo món ăn</Text>
            </SafeAreaView>
            <View className="flex ml-4">
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] my-2">
                    <Text className="text-white font-bold mr-5">Tên món:</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. Cơm trắng"
                        placeholderTextColor="gray"
                        value={foodName}
                        onChangeText={setFoodName}
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-4 my-2">
                    <Text className="text-white font-bold mr-5">Khẩu phần:</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. Bát"
                        placeholderTextColor="gray"
                        value={portion}
                        onChangeText={setPortion}
                    />
                </View>
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


                <View className="items-end mt-4">
                    <TouchableOpacity
                        className="bg-green-400 p-4 rounded-l-[12px] ml-4 my-2 w-40 items-center justify-center"
                        onPress={handleAddFood}
                    >
                        <Text className="text-lg font-bold">Thêm món ăn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateFood;
