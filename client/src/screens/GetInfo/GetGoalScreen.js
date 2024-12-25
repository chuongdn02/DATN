import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { RulerPicker } from 'react-native-ruler-picker';

const GetGoalScreen = ({ navigation, route }) => {
    const { record } = route.params;
    const [goal_weight, set_goal_weight] = useState(record.weight);
    const [intensity, setIntensity] = useState('medium');

    const calculateWeeks = () => {
        const weightDifference = Math.abs(goal_weight - record.weight);
        const rate = intensity === 'low' ? 0.25 : intensity === 'medium' ? 0.5 : 1;
        return weightDifference / rate;
    };

    const calculateBMI = () => {
        const BMI = record.weight / Math.pow(record.height / 100, 2);
        return BMI.toFixed(2);
    };

    const getBMIType = () => {
        const BMI = calculateBMI();
        if (BMI < 16) {
            return ' Gầy độ 3';
        } else if (BMI < 16.9) {
            return ' Gầy độ 2';
        } else if (BMI < 18.4) {
            return ' Gầy độ 1';
        } else if (BMI < 24.9) {
            return 'Bình thường';
        } else if (BMI < 29.9) {
            return 'Tiền béo phì (Thừa cân)';
        } else if (BMI < 34.9) {
            return ' Béo phì độ I';
        } else if (BMI < 39.9) {
            return 'Béo phì độ II';
        } else {
            return ' Béo phì độ III';
        }
    };

    const getGoalType = () => {
        const currentWeight = parseFloat(record.weight);
        const targetWeight = parseFloat(goal_weight);

        if (currentWeight > targetWeight) {
            return 'lose';
        } else if (currentWeight === targetWeight) {
            return 'maintain';
        } else {
            return 'gain';
        }
    };

    const getRate = () => {
        return intensity === 'low' ? 0.25 : intensity === 'medium' ? 0.5 : 1;
    };


    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        const goal = getGoalType();
        const time = calculateWeeks();
        if (!intensity) {
            alert('Please select the intensity of your goal');
            return;
        }
        const updatedRecord = {
            ...record,
            goal,
            intensity,
            goal_weight,
            time,
        };

        navigation.navigate('Summary', { record: updatedRecord });
    };
    return (
        <ImageBackground
            source={require('../../assets/images/bg-all.jpg')}
            className="flex-1"
            resizeMode="cover"
        >
            <View className="flex-1 bg-[#1a202c]">
                <SafeAreaView className="flex">
                    <View className="flex justify-start">
                        <Text className="text-2xl text-yellow-300 font-bold text-center">
                            Hãy thiết lập cân nặng mục tiêu
                        </Text>

                    </View>
                </SafeAreaView>
                <View className="flex-1">

                    <View>
                        <View className="items-center p-4">
                            <Text className="text-green-500 text-2xl font-bold">BMI của bạn là {calculateBMI()}</Text>
                            <Text className="text-white text-lg text-center p-2">Bạn {getBMIType()} theo đánh giá của WHO BMI(kg/m2)</Text>
                        </View>
                        <View className="items-center mx-2">
                            <Image
                                source={require('../../assets/images/bodyMass.jpeg')}
                                className="rounded-lg w-full h-52 "
                            />
                            <Text>hihi</Text>
                        </View>
                    </View>
                    <View className="items-center px-10">
                        <Text className="text-base text-white font-bold mb-4 ">Mục tiêu(kg): {goal_weight} kg</Text>
                        <View className="flex flex-row justify-center items-center h-10 overflow-hidden bg-white/50 rounded-full">
                            <RulerPicker
                                value={goal_weight}
                                onValueChange={set_goal_weight}
                                min={0}
                                max={200}
                                step={1}
                                initialValue={parseFloat(record.weight)}
                                showMarks
                                showLabels
                                rulerColor="#FFC107"
                                thumbColor="#FF1466"
                            />
                        </View>
                    </View>
                    <View className="px-5 my-4">
                        <Text className="text-white font-bold mb-2">Thiết lập mục tiêu:</Text>
                        <View className="flex-row justify-between space-x-4">
                            <TouchableOpacity
                                className={`p-3 rounded-lg w-24 items-center ${intensity === 'low' ? 'bg-green-500' : 'bg-white'}`}
                                onPress={() => setIntensity('low')}
                            >
                                <Text >Chậm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`p-3 rounded-lg w-24 items-center ${intensity === 'medium' ? 'bg-green-500' : 'bg-white'}`}
                                onPress={() => setIntensity('medium')}
                            >
                                <Text >Vừa phải</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`p-3 rounded-lg w-24 items-center ${intensity === 'high' ? 'bg-green-500' : 'bg-white'}`}
                                onPress={() => setIntensity('high')}
                            >
                                <Text >Nhanh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="p-5">
                        <View className="flex-row">
                            <Text className="text-white">{calculateWeeks()} weeks - </Text>
                            <Text className="text-white">{intensity}</Text>
                        </View>
                        <View className="flex-row">
                            <Text className="text-green-500">{getGoalType()}</Text>
                            <Text className="text-green-500">{getRate()} kg/week</Text>
                        </View>
                    </View>

                </View>


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
