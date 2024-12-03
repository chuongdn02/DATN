import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';

const GetGoalScreen = ({navigation,route}) => {
    const { record } = route.params;
    const [goal, setGoal] = useState(null);
    const options = [
        {
            title: 'Duy trì cân nặng',
            description: 'Cách giữ cân: Duy trì mức năng lượng theo cân nặng hiện tại',
            projection: 'Dự kiến: Ổn định cân nặng',
            nutrients: 'Tỷ lệ chất dinh dưỡng: Protein (15-25%) - Lipid (15-30%) - Glucid (55-65%)',
            isDefault: true,
            value: 'maintain',
            img: require('../../assets/images/maintain_weight.png'),
        },
        {
            title: 'Tăng cân',
            description: 'Cách tăng cân: Tăng 600-700 kcal/ngày so với mức năng lượng hiện tại',
            projection: 'Dự kiến: Tăng 2-4kg/tháng',
            nutrients: 'Tỷ lệ chất dinh dưỡng: Protein (15-30%) - Lipid (15-30%) - Glucid (50-60%)',
            value: 'gain',
            img: require('../../assets/images/gain_weight.png'),
        },
        {
            title: 'Giảm cân',
            description: 'Cách giảm cân: Giảm 550-650 kcal/ngày so với mức năng lượng hiện tại',
            projection: 'Dự kiến: Giảm 2-4kg/tháng',
            nutrients: 'Tỷ lệ chất dinh dưỡng: Protein (15-25%) - Lipid (20-30%) - Glucid (40-55%)',
            value: 'lose',
            img: require('../../assets/images/lose_weight.png'),
        },
    ];

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (!goal) {
            alert('Please fill all the fields');
            return;
        }
        const updatedRecord = { ...record, goal };  // Make sure `record` is defined
        navigation.navigate('Summary', { record: updatedRecord });  // Pass `record` to Home
    };
    return (
        <ImageBackground
        source={require('../../assets/images/bg-all.jpg')} // Đường dẫn ảnh nền
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 ">
            <SafeAreaView className="flex">
                <View className="flex justify-start">
                    <Text className="text-2xl text-yellow-300 font-bold text-center">
                        Vận động của bạn thế nào?
                    </Text>
                    <View className="px-5">
                        <Text className="text-white px-7">
                            Dựa trên mức độ vận động của bạn, chúng tôi có thể đánh giá nhu cầu calo hàng ngày của bạn.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

            <ScrollView className="flex-1 p-7 mb-20">
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        className={`p-4 mb-4 rounded-2xl flex-row items-center ${ goal === option.value ? 'bg-yellow-300/80' : 'bg-white/20'
                            }`}
                        style={{
                            borderWidth: goal === index ? 1 : 1,
                            borderColor: goal === index ? '#34d399' : '#d1d5db',
                        }}
                        onPress={() => setGoal(option.value)}
                    >
                        <Image
                            source={option.img}
                            className="w-16 h-16 rounded-md mr-4"
                            resizeMode="cover"
                        />
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-rose-500 mb-2">{option.title}</Text>
                            <Text className="text-sm text-white mb-1">- {option.description}</Text>
                            <Text className="text-sm text-white mb-1">- {option.projection}</Text>
                            <Text className="text-sm text-white mb-1">- {option.nutrients}</Text>
                            {option.isDefault && (
                                <Text className="text-yellow-300 underline">Chế độ mặc định</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View className="absolute bottom-4 left-4 right-4 flex-row justify-between p-4">
                <TouchableOpacity
                    onPress={handleBack}
                    className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl border-[1px] border-white"
                >
                    <Text className="font-bold text-center text-gray-700">Trở lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl border-[1px] border-white"
                >
                    <Text className="font-bold text-center text-gray-700">Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
    );
};

export default GetGoalScreen;
