import React from 'react';
import { View, Text } from 'react-native';

const DailyStats = ({ stats, data }) => {
  if (!stats || !data) return null;

  const statsWithoutDate = { ...stats };
  delete statsWithoutDate.date;

  return (
    <View className="flex-row justify-center items-center w-full">
      {Object.keys(statsWithoutDate).map((key) => (
        <View key={key} className="flex-1 items-center p-1">
          <Text
            className={`text-base font-bold ${statsWithoutDate[key] > data[key] ? 'text-red-500' : 'text-white'
              }`}
          >
            {statsWithoutDate[key]}/{data[key]}
          </Text>

          <Text className="text-gray-400 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)} (g)</Text>
          <View className="w-14 h-2 bg-gray-700 rounded-full mt-2">
            <View
              className="h-2 rounded-full items-center"
              style={{
                width: `${(statsWithoutDate[key] / data[key]) * 100}%`,
                maxWidth: '100%',
                backgroundColor:
                  key === 'calories'
                    ? '#FFD700'
                    : key === 'carbs'
                      ? '#32CD32'
                      : key === 'protein'
                        ? '#FF4500'
                        : '#FFA500',
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default DailyStats;
