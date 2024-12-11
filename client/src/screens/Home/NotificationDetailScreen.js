import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const NotificationDetailScreen = ({ route }) => {
  const { notificationId } = route.params;

  // Dữ liệu giả cho chi tiết thông báo
  const notificationDetails = [
    { id: 1, message: 'Hãy nhớ uống nước!', time: '12:00 PM', details: 'Hãy uống đủ 2 lít nước mỗi ngày để duy trì sức khỏe.' },
    { id: 2, message: 'Chúc mừng bạn đã hoàn thành mục tiêu ngày hôm nay!', time: '9:30 AM', details: 'Bạn đã đạt được mục tiêu giảm cân 0.5kg hôm nay.' },
    { id: 3, message: 'Cập nhật dinh dưỡng ngày hôm nay đã được lưu.', time: 'Yesterday', details: 'Dinh dưỡng của bạn đã được điều chỉnh để phù hợp với mục tiêu tăng cân.' },
    { id: 4, message: 'Đừng quên ăn đủ bữa trong ngày!', time: '8:00 AM', details: 'Cố gắng ăn 3 bữa chính và 2 bữa phụ mỗi ngày để duy trì năng lượng.' },
    { id: 5, message: 'Mục tiêu cân nặng của bạn đã được điều chỉnh.', time: 'Last week', details: 'Mục tiêu cân nặng của bạn đã được cập nhật để phù hợp với kế hoạch tập luyện mới.' },
  ];

  const notification = notificationDetails.find(item => item.id === notificationId);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Thông Báo Chi Tiết</Text>
      <Text style={styles.message}>{notification?.message}</Text>
      <Text style={styles.details}>{notification?.details}</Text>
      <Text style={styles.time}>{notification?.time}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  details: {
    color: '#A0AEC0',
    fontSize: 14,
    marginBottom: 10,
  },
  time: {
    color: '#A0AEC0',
    fontSize: 12,
  },
});

export default NotificationDetailScreen;
