import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

const NutritionTracker = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  // Tạo tuần hiện tại
  const currentDate = moment(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    currentDate.clone().startOf('week').add(i, 'days')
  );

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {/* Thanh thống kê */}
      <View className="flex-row justify-between mb-4">
        {/* Calories */}
        <View className="flex-1 items-center">
          <Text className="text-white text-base font-bold">800/2418</Text>
          <Text className="text-gray-400 text-sm">Calories (kCal)</Text>
          <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
            <View className="h-2 bg-yellow-400 rounded-full" style={{ width: '33%' }} />
          </View>
        </View>

        {/* Carbs */}
        <View className="flex-1 items-center mx-2">
          <Text className="text-white text-base font-bold">40/30</Text>
          <Text className="text-gray-400 text-sm">Carbs (g)</Text>
          <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
            <View className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }} />
          </View>
        </View>

        {/* Protein */}
        <View className="flex-1 items-center mx-2">
          <Text className="text-white text-base font-bold">70/151</Text>
          <Text className="text-gray-400 text-sm">Protein (g)</Text>
          <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
            <View className="h-2 bg-red-500 rounded-full" style={{ width: '46%' }} />
          </View>
        </View>

        {/* Fat */}
        <View className="flex-1 items-center">
          <Text className="text-white text-base font-bold">70/188</Text>
          <Text className="text-gray-400 text-sm">Fat (g)</Text>
          <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
            <View className="h-2 bg-orange-500 rounded-full" style={{ width: '37%' }} />
          </View>
        </View>
      </View>

      {/* Lịch */}
      <View className="flex-row justify-between mb-4">
        {weekDays.map((day, index) => (
          <View key={index} className="items-center">
            <Text className="text-gray-400 text-sm">{day.format('ddd').toUpperCase()}</Text>
            <TouchableOpacity
              onPress={() => handleDateSelect(day.format('YYYY-MM-DD'))}
              className={`w-10 h-10 rounded-full items-center justify-center mt-2 ${
                selectedDate === day.format('YYYY-MM-DD') ? 'bg-green-500' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-sm ${
                  selectedDate === day.format('YYYY-MM-DD')
                    ? 'text-white font-bold'
                    : 'text-gray-400'
                }`}
              >
                {day.format('D')}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Ngày hiện tại */}
      <Text className="text-gray-400 text-center text-sm">
        {currentDate.format('dddd, DD MMMM YYYY')}
      </Text>
    </View>
  );
};

export default NutritionTracker;
