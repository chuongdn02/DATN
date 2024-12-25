import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const CreateFood = ({ route, navigation }) => {
    const { title } = route.params;
    return (
        <View className="bg-[#1a202c] flex-1">
            <SafeAreaView className="flex-row items-center mb-4">
                <TouchableOpacity 
                onPress={() => navigation.goBack()} >
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-4 text-center">{title}</Text>
            </SafeAreaView>
            <View className="flex ml-4 ">
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] my-2">
                    <Text className="text-white font-bold mr-5">Tên món:</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. Cơm trắng"
                        placeholderTextColor="gray"
                        
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-4 my-2">
                    <Text className="text-white font-bold mr-5">Khẩu phần:</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="vd. Bát"
                        placeholderTextColor="gray"
                        
                    />
                </View>
                <View className="flex-row shadow-custom bg-gray-900 p-5 rounded-l-[12px] ml-8 my-2">
                    <Text className="text-white font-bold mr-5">Số lượng:</Text>
                    <TextInput
                        className="flex-1 text-white text-right"
                        placeholder="1"
                        placeholderTextColor="gray"
                        
                    />
                </View>

                <View className="items-end mt-4">
                    <TouchableOpacity 
                    className="bg-green-400 p-4 rounded-l-[12px] ml-4 my-2 w-40 items-center justify-center"
                    onPress={() => navigation.goBack()} 
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

export default CreateFood;