import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RulerPicker } from 'react-native-ruler-picker';

const GetInfoScreen = ({ navigation }) => {

  const [record] = useState({
    gender: '',
    activity_level: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    checked: false,
  });
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleNext = () => {
    if (!gender || !age || !height || !weight) {
      alert('Please fill all the fields');
      return;
    }
    const updatedRecord = { ...record, gender, age, height, weight };
    navigation.navigate('GetActivity', { record: updatedRecord });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-all.jpg')} // Đường dẫn ảnh nền
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1  bg-[#1a202c]">
        <SafeAreaView className="flex ">
          <View className="flex justify-start">
            <Text className="text-2xl text-yellow-300 font-bold text-center">Hãy cho chúng tôi biết về bạn!</Text>
            <View className="px-7">
              <Text className="text-white/70 mb-5">
                Thông tin của bạn sẽ quyết định mức tiêu thụ năng lượng của bạn.
              </Text>

            </View>
          </View>
        </SafeAreaView>
        <View className="flex-1  p-7 rounded-tl-[50px] rounded-tr-[50px] ">
          <Text className="text-base text-white font-bold mb-2">Giới tính:</Text>
          <View className="flex-row justify-around mb-8">
            <TouchableOpacity
              onPress={() => setGender('Girl')}
              className={`items-center p-3 rounded-lg border ${gender === 'Girl' ? 'bg-pink-200 border-pink-400' : ' border-white border-[1px] bg-white/30'
                }`}
            >
              <Image
                source={require('../../assets/images/girl.png')}
                className="w-20 h-20"
              />
              <Text className="text-base text-white font-bold">Nữ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('Boy')}
              className={`items-center p-3 rounded-lg border ${gender === 'Boy' ? 'bg-blue-200 border-blue-400' : '  border-white border-[1px] bg-white/30'
                }`}
            >
              <Image
                source={require('../../assets/images/boy.png')}
                className="w-20 h-20"
              />
              <Text className="text-base text-white font-bold">Nam</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base text-white font-bold mb-2">Tuổi:</Text>
          <View className="rounded-full p-3 mb-8 h-10 justify-center bg-white/50">
            <Picker
              selectedValue={age}
              onValueChange={(itemValue) => setAge(itemValue)}
              style={{ color: 'white' }}
              itemStyle={{ color: 'white' }} // Apply white color to all items
            >
              <Picker.Item
                label="chọn tuổi của bạn"
                value=""
              />
              {Array.from({ length: 100 }, (_, index) => (
                <Picker.Item
                  key={index}
                  label={`${index + 1}`}
                  value={`${index + 1}`}
                />
              ))}
            </Picker>
          </View>

          <Text className="text-base text-white font-bold mt-10 mb-2 ">Chiều cao (cm): {height} cm</Text>
          <View className="flex flex-row justify-center mb-8 items-center h-10 overflow-hidden bg-white/50 rounded-full">
            <RulerPicker
              value={height}
              onValueChange={setHeight}
              min={0}
              max={250}
              step={1}
              initialValue={62}
              showMarks
              showLabels
              rulerColor="#FFC107"
              thumbColor="#FF1466"
            />
          </View>

          <Text className="text-base text-white font-bold mb-2 mt-10 ">Cân nặng (kg): {weight} kg</Text>
          <View  className="flex flex-row justify-center items-center h-10 overflow-hidden bg-white/50 rounded-full">
            <RulerPicker
              value={weight}
              onValueChange={setWeight}
              min={0}
              max={250}
              step={1}
              initialValue={162}
              showMarks
              showLabels
              rulerColor="#FFC107"
              thumbColor="#FF1466"
            />
          </View>
          <View className="absolute bottom-4 right-5 flex-row justify-end p-4">
            <TouchableOpacity
              onPress={handleNext}
              className="bg-yellow-400 p-2 rounded-tr-2xl border-[1px] border-white rounded-bl-2xl ml-4"
            >
              <Text className="font-bold text-center text-gray-700">Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default GetInfoScreen;
