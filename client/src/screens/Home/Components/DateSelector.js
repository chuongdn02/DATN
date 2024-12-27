import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
import Icon from 'react-native-vector-icons/MaterialIcons';

const DateSelector = ({ selectedDate, handleDateSelect }) => {
  const currentDate = moment(selectedDate);
  const startOfWeek = currentDate.startOf('week');
  
  const today = moment().format('YYYY-MM-DD'); 

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    startOfWeek.clone().add(i, 'days')
  );

  const handlePreviousWeek = () => {
    handleDateSelect(currentDate.clone().subtract(1, 'week').format('YYYY-MM-DD'));
  };

  const handleNextWeek = () => {
    handleDateSelect(currentDate.clone().add(1, 'week').format('YYYY-MM-DD'));
  };

  return (
    <View className="flex-row justify-center items-center mb-4 mx-12">
      <TouchableOpacity onPress={handlePreviousWeek}>
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>

      <View className="flex-row mx-8 justify-center">
        {weekDays.map((day, index) => (
          <View key={index} className="items-center mx-1">
            <Text className="text-gray-400 text-sm">{day.format('ddd').toUpperCase()}</Text>
            <TouchableOpacity
              onPress={() => handleDateSelect(day.format('YYYY-MM-DD'))}
              className={`w-10 h-10 rounded-full items-center justify-center mt-2 ${
                selectedDate === day.format('YYYY-MM-DD') ? 'bg-green-500' :
                today === day.format('YYYY-MM-DD') ? 'bg-blue-500' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-sm ${
                  selectedDate === day.format('YYYY-MM-DD')
                    ? 'text-white font-bold'
                    : today === day.format('YYYY-MM-DD')
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

      {/* Button to go to the next week */}
      <TouchableOpacity onPress={handleNextWeek}>
        <Icon name="chevron-right" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DateSelector;
