import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRecords } from '../../store/actions/authActions';
const ProfileScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newGoalWeight, setNewGoalWeight] = useState('');
  const dispatch = useDispatch();
  // Access user info and records data from Redux state
  const name = useSelector((state) => state.auth.user.user?.name);
  const userId = useSelector((state) => state.auth.user.user?.userId);
  const data = useSelector((state) => state.auth.records.records);

  // Get the latest record (assuming the records are sorted or the last one is the latest)
  const latestRecord = data[data.length - 1] || {};
  const { weight = 0, goal_weight = 0, goal = '', age = 0, activity_level = '', gender = '', height = 0 } = latestRecord;

  const currentWeight = weight;
  const goalWeight = goal_weight;
  const currentGoal = goal || (weight > goal_weight ? 'lose' : weight < goal_weight ? 'gain' : 'maintain');


  const handleUpdateGoalWeight = () => {
    if (!newGoalWeight) return alert('Hãy nhập cân nặng mới!');

    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn cập nhật cân nặng mới không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              const latestRecord = data[data.length - 1];
              const newRecord = {
                ...latestRecord,
                goal_weight: parseFloat(newGoalWeight),
                time: new Date().toISOString(),
              };

              // Lưu vào Redux (frontend)
              dispatch({ type: 'ADD_RECORD', payload: newRecord });

              // Lưu vào backend
              const response = await fetch(
                `http://localhost:3000/auth/users/${userId}/record`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newRecord),
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                return;
              }

              dispatch(fetchUserRecords(userId));
            } catch (error) {
              console.error('Error saving record:', error);
              alert('Có lỗi xảy ra, vui lòng thử lại sau!');
            } finally {
              // Đóng modal
              setModalVisible(false);
              setNewGoalWeight('');
            }
          }
        }
      ]
    );
  };
  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          onPress: () => {
            navigation.replace('Welcome');
            
          },
        },
      ]
    );
  };


  return (
    <ScrollView className="bg-[#1a202c] flex-1 p-4">
      {/* Title */}
      <SafeAreaView className="items-center">
        <Text className="text-white text-2xl font-bold">{name}</Text>
        <Text className="text-gray-400 text-sm">{currentGoal === 'maintain' ? 'Duy trì' : currentGoal === 'gain' ? 'Tăng cân' : 'Giảm cân'}</Text>
      </SafeAreaView>

      <View className="bg-gray-900 mt-6 rounded-lg p-4" style={{ shadowColor: '#FFFFFF', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 5 }}>
        <View className="flex-row justify-between">
          {/* Cân nặng mục tiêu section */}
          <View className="items-center flex-1">
            <Icon name="flag-outline" size={25} color="#FFFFFF" />
            <Text className="text-white">Cân nặng mục tiêu</Text>
            <Text className="text-green-500 text-2xl font-bold">{goalWeight} kg</Text>
          </View>

          {/* Cân nặng thay đổi section */}
          <View className="items-center flex-1">
            <Icon name="clipboard-outline" size={25} color="#FFFFFF" />
            <Text className="text-white text-center">
              {(() => {
                if (data?.length > 0) {
                  const startWeight = data[0].weight;
                  const currentWeight = data[data.length - 1].weight;
                  const weightChange = currentWeight - startWeight;
                  if (weightChange < 0) { return 'Bạn đã giảm'; }
                  if (weightChange > 0) { return 'Bạn đã tăng'; }
                  return 'Duy trì cân nặng';
                }
                return '';
              })()}
            </Text>
            <Text className="text-red-500 text-2xl font-bold">
              {data?.length > 0
                ? `${Math.abs(data[data.length - 1].weight - data[0].weight)} Kg`
                : '0 Kg'}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="bg-gray-700 h-2 my-4 rounded-lg">
          <View className="bg-white h-2 w-[100%] rounded-lg" />
        </View>
        <Text className="text-center text-white font-bold text-lg">Cân nặng hiện tại: {currentWeight} kg</Text>
        <View className="items-end">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-teal-300 p-3 w-[60%] top-7 left-4 rounded-l-lg items-center"
          >
            <Text className="text-black font-bold">Cập nhật mục tiêu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Settings */}
      <View className="mt-6 bg-gray-900 p-3 rounded-lg">
        <Text className="text-white text-lg font-bold mb-4">Tài khoản</Text>
        {["Cài đặt tài khoản", "Xóa tài khoản", "Đăng xuất", "Nâng cấp gói Premium"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              if (item === "Đăng xuất") {
                handleLogout();
              } else {
                Alert.alert(item, `Tính năng ${item} chưa được triển khai`);
              }
            }}
            className="bg-gray-800 p-4 rounded-sm border-gray-500 border-2"
          >
            <Text className="text-white">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Profile Settings */}
      <View className="mt-2 bg-gray-900 p-3 rounded-lg">
        <Text className="text-white text-lg font-bold mb-4">Cài đặt hồ sơ</Text>
        {["Khôi phục giao dịch mua", "Thông tin gói đăng ký", "Chỉnh sửa mục tiêu", "Nhắc nhở"].map((item) => (
          <TouchableOpacity
            key={item}
            className="bg-gray-800 p-4 rounded-sm border-gray-500 border-2"
          >
            <Text className="text-white">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for updating goal weight */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-lg w-[80%]">
            <Text className="text-lg font-bold mb-4">Cập nhật mục tiêu cân nặng</Text>
            <TextInput
              placeholder="Nhập cân nặng mục tiêu"
              keyboardType="numeric"
              value={newGoalWeight}
              onChangeText={setNewGoalWeight}
              className="bg-gray-200 p-3 rounded-md mb-4"
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-red-500 p-3 rounded-md w-[48%]"
              >
                <Text className="text-white text-center">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateGoalWeight}
                className="bg-teal-500 p-3 rounded-md w-[48%]"
              >
                <Text className="text-white text-center">Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
