import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AddFood = ({ navigation, route }) => {
    const { value } = route.params;
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        // Update the title based on the "value"
        if (value === 'Breakfast') {
            setTitle('Bữa Sáng');
        } else if (value === 'Lunch') {
            setTitle('Bữa Trưa');
        } else if (value === 'Dinner') {
            setTitle('Bữa Tối');
        } else if (value === 'Snack') {
            setTitle('Bữa Phụ');
        } else {
            setTitle('');
        }
    }, [value]);

    return (
        <View className="bg-[#1a202c] flex-1">
            <SafeAreaView className="flex-row items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="">
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-4 text-center">{title}</Text>
            </SafeAreaView>
            <View className="flex-row ">
                <TextInput
                    className="p-3 bg-gray-100 text-gray-700 w-[77%] rounded-lg mx-4 mb-3 "
                    value={search}
                    onChangeText={setSearch}
                    placeholder="🔍Tìm món ăn"
                />
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/images/qrcode.png')}
                        className="w-10 h-10 bg-white" // Adjust the width and height accordingly
                        resizeMode="contain" // Ensures the image maintains its aspect ratio
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-row ml-3">
                {['Tất cả', 'Món của tôi', 'Thực đơn của tôi'].map((option, index) => (
                    <Text
                        key={index}
                        onPress={() => setSelected(index)}
                        className={`p-2 mx-1 mt-2 rounded-full font-bold text-white border-[1px] border-white ${selected === index ? 'bg-blue-500' : 'bg-transparent'
                            } text-center`}
                    >
                        {option}
                    </Text>
                ))}
            </View>
            <View className="absolute bottom-16 right-0 space-y-2">
                <TouchableOpacity
                    onPress={() => navigation.navigate('CrFood',{title:'Tạo món ăn'})}
                    className="bg-green-400 rounded-l-[12px] p-3 justify-center items-center ">
                    <Text className="font-bold text-lg">Tạo một món</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Workout')}
                    className="rounded-l-[12px] p-3 justify-center items-center bg-[#1a202c] shadow-custom"
                >
                    <Text className="font-bold text-lg text-white">Thêm nhanh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddFood;
