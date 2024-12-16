import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const SummaryScreen = ({ navigation, route }) => {
  const { record } = route.params;
  const userId = useSelector((state) => state.auth.user.user.userId);
  const weight = Math.round(record.weight);
  const goal_weight = Math.round(record.goal_weight);
  const time = Math.round(record.time);
  const today = new Date();

  const goalDate = new Date(today);
goalDate.setDate(today.getDate() + time * 7);

  const formattedToday = today.toLocaleDateString(); // Format today's date for display
const formattedGoalDate = goalDate.toLocaleDateString();

const data = [
  { weight: weight, alt: 'start', date: formattedToday },
  { weight: weight, alt: 'current', date: formattedToday },
  { weight: goal_weight, alt: 'goal', date: formattedGoalDate },
];

  // Define scales for x and y axes
  const xScale = scaleLinear().domain([0, data.length - 1]).range([25, 275]);
  const yScale = scaleLinear()
    .domain([
      Math.min(...data.map((d) => d.weight)) - 15,
      Math.max(...data.map((d) => d.weight)) + 15,
    ])
    .range([150, 0]);

  const lineGenerator = line()
    .x((d, index) => xScale(index))
    .y((d) => yScale(d.weight))
    .curve(curveCardinal.tension(0.9));

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/users/${userId}/record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn tiếp tục với các thông tin này không?",
        [
          {
            text: "Hủy",
            style: "cancel"
          },
          {
            text: "Xác nhận",
            onPress: () => navigation.navigate('Home')
          },
        ]
      );
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-all.jpg')} // Background image
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 p-5 bg-[#1a202c]">
        <Text className="text-2xl text-yellow-300 font-bold text-center mb-5">
          Thông tin tóm tắt
        </Text>

        {/* Weight Chart */}
        <Text className="text-lg font-bold text-yellow-300 px-5">Mục tiêu:</Text>
        <View className="items-center bg-neutral-900 rounded-lg m-5">
          <Svg height="200" width="300">
            {/* Line Path */}
            <Path
              d={lineGenerator(data)}
              fill="none"
              stroke="#00FFAA"
              strokeWidth={5}
            />
            {/* Circles and Labels on Data Points */}
            {data.map((point, index) => (
              <React.Fragment key={index}>
                <Circle cx={xScale(index)} cy={yScale(point.weight)} r={5} fill="#FF5555" />
                <SvgText
                  x={xScale(index)}
                  y={yScale(point.weight) - 15}
                  fontSize={10}
                  fill="#C0C0C0"
                  textAnchor="middle"
                >
                  {point.date}
                </SvgText>
              </React.Fragment>
            ))}
          </Svg>
        </View>
        <View className="flex-row justify-between mb-4 px-8">
                    {data.map((item, index) => (
                        <View key={index} className="items-center">
                            <Text className="text-white text-sm">{item.alt.toUpperCase()}</Text>
                            <Text className="text-red-400 text-base font-bold">{`${item.weight} Kg`}</Text>
                        </View>
                    ))}
                    </View>
        <ScrollView className="px-3">

          {/* Record Summary */}
          {[
            { label: 'Giới tính', value: record.gender || 'Chưa cập nhật', icon: 'person' }, // Ionicons 'person' for gender
            { label: 'Mức độ vận động', value: record.activity_level || 'Chưa cập nhật', icon: 'fitness' }, // Ionicons 'fitness' for activity level
            { label: 'Tuổi', value: record.age || 'Chưa cập nhật', icon: 'calendar' }, // Ionicons 'md-cake' for age
            { label: 'Chiều cao', value: `${record.height || 'Chưa cập nhật'} cm`, icon: 'arrow-up-circle' }, // Ionicons 'arrow-up-circle' for height
            { label: 'Cân nặng', value: `${record.weight || 'Chưa cập nhật'} kg`, icon: 'scale' }, // Ionicons 'scale' for weight
          ].map((item, index) => (
            <View key={index} className="bg-white/20 p-5 rounded-2xl mb-3 flex-row">
            <View className="p-2">
              <Icon name={item.icon} size={30} color="#FF5555"  />
              </View>
              <View>
                <Text className="text-lg font-bold text-yellow-300 mb-2 flex-row items-center">
                  {item.label}:
                </Text>
                <Text className="text-white">{item.value}</Text>
              </View>
            </View>
          ))}

        </ScrollView>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-5 px-5">
          <TouchableOpacity
            onPress={handleBack}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl border-[1px] border-white"
          >
            <Text className="font-bold text-center text-gray-700">Trở lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl border-[1px] border-white"
          >
            <Text className="font-bold text-center text-gray-700">Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SummaryScreen;
