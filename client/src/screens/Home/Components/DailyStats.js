import React from 'react';
import { View, Text } from 'react-native';

const DailyStats = ({ stats, data }) => (
  <View className="flex-row justify-between mb-4">
    {Object.keys(stats).map((key) => (
      <View key={key} className="flex-1 items-center mx-2">
        <Text className="text-white text-base font-bold">
          {stats[key]}/{data[key]}
        </Text>
        <Text className="text-gray-400 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)} (g)</Text>
        <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
          <View
            className="h-2 rounded-full"
            style={{
              width: `${(stats[key] / data[key]) * 100}%`,
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

export default DailyStats;
