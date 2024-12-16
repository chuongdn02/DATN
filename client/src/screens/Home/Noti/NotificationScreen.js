import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
const NotificationScreen = ({ navigation }) => {
  // Mock data for notifications
  const notifications = [
    { id: 1, message: 'Bạn có một tin nhắn mới từ bác sĩ', time: '2024-12-10T12:00:00Z' },
    { id: 2, message: 'Lịch hẹn của bạn đã được xác nhận', time: '2024-12-10T11:00:00Z' },
    { id: 3, message: 'Đừng quên uống đủ nước hôm nay', time: '2024-12-10T10:00:00Z' },
    { id: 4, message: 'Có một bài viết mới về dinh dưỡng', time: '2024-12-10T09:00:00Z' },
    { id: 5, message: 'Cập nhật chế độ ăn uống mới cho bạn hahas', time: '2024-12-09T15:00:00Z' },
    { id: 6, message: 'Cập nhật chế độ ăn uống mới cho bạn', time: '2024-12-09T12:30:00Z' },
  ];

  const renderNotificationItem = ({ item }) => {
    const localTime = parseISO(item.time,'Asia/Ho_Chi_Minh');
    const timeAgo = formatDistanceToNow(localTime, { addSuffix: true });

    return (
      <TouchableOpacity
        className="bg-gray-700 rounded-lg p-3 mb-3 justify-between"
        onPress={() => navigation.navigate('NotificationDetail', { notificationId: item.id })}
      >
        <View className="flex-row items-center">
          <Ionicons name="notifications" size={24} color="#4A90E2" />
          <Text
            className="text-white pr-5 ml-3 text-lg"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.message}
          </Text>
        </View>
        <Text className="text-gray-400 text-sm">{timeAgo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex p-5">
        <Text className="font-bold text-white text-2xl mb-4">Thông Báo</Text>
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
