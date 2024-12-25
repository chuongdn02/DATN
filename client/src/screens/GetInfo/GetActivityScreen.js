import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';

const GetActivityScreen = ({ route, navigation }) => {
  const [activity_level, setActivity_level] = useState('');
  const { record } = route.params; // Lấy record từ route params

  const options = [
    {
      value: 'low',
      img: require('../../assets/images/low.png'),
      label: 'Ít hoặc không hoạt động',
      description:
        'Hầu hết thời gian ngồi suốt cả ngày (ví dụ: Công việc ngồi văn phòng, nhân viên ngân hàng).',
    },
    {
      value: 'light',
      img: require('../../assets/images/light.png'),
      label: 'Hoạt động nhẹ nhàng',
      description:
        'Hầu hết thời gian đứng suốt cả ngày (ví dụ: Nhân viên bán hàng, Giáo viên).',
    },
    {
      value: 'moderate',
      img: require('../../assets/images/moderate.png'),
      label: 'Hoạt động vừa phải',
      description:
        'Hầu hết thời gian đi bộ hoặc thực hiện các hoạt động thể chất (ví dụ: Hướng dẫn viên, người phục vụ).',
    },
    {
      value: 'very_active',
      img: require('../../assets/images/very-active.png'),
      label: 'Hoạt động rất nhiều',
      description:
        'Hầu hết thời gian thực hiện các hoạt động thể chất nặng suốt cả ngày (ví dụ: Công nhân, vận động viên).',
    },
  ];

  const handleNext = () => {
    if (!activity_level) {
      alert('Please fill all the fields');
      return;
    }
    const updatedRecord = { ...record, activity_level };
    navigation.navigate('GetGoal', { record: updatedRecord });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
    source={require('../../assets/images/bg-all-1.jpg')} // Đường dẫn ảnh nền
    className="flex-1"
    resizeMode="cover"
  >
    <View className="flex-1  bg-[#1a202c]">
      <SafeAreaView className="flex">
        <View className="flex justify-start">
          <Text className="text-2xl text-yellow-300 font-bold text-center">
            Vận động của bạn thế nào?
          </Text>
          <View className="px-5">
            <Text className="text-white/70 mb-5">
              Dựa trên mức độ vận động của bạn, chúng tôi có thể đánh giá nhu cầu calo hàng ngày của bạn.
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View className="flex-1 p-7 rounded-tl-[50px] rounded-tr-[50px]">
        <View className="flex-1">
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              className={`flex-row items-center p-4 mb-4 rounded-xl bg-white/20 border ${
                activity_level === option.value
                  ? 'bg-yellow-300/80 border-white'
                  : 'border-white border-[1px]'
              }`}
              onPress={() => setActivity_level(option.value)}
            >
              {/* Hình ảnh */}
              <Image
                source={option.img}
                className="w-12 h-12 mr-4"
                resizeMode="contain"
              />
              {/* Nội dung */}
              <View className="flex-1 ">
                <Text className="text-lg font-bold text-rose-500">{option.label}</Text>
                <Text className="text-sm text-white">{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="absolute bottom-4 left-4 right-4 flex-row justify-between p-4">
          {/* Nút Back */}
          <TouchableOpacity
            onPress={handleBack}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl border-[1px] border-white"
          >
            <Text className="font-bold text-center text-gray-700">Trở lại</Text>
          </TouchableOpacity>

          {/* Nút Next */}
          <TouchableOpacity
            onPress={handleNext}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl border-[1px] border-white"
          >
            <Text className="font-bold text-center text-gray-700">Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

export default GetActivityScreen;
