import React from 'react';
import { useDispatch } from 'react-redux'; // Sử dụng dispatch từ Redux
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LOGOUT } from '../../store/actions/types'; // Nhớ thay đổi đường dẫn import đúng với dự án của bạn

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch(); // Khởi tạo dispatch

  const handleLogoutAndNavigate = () => {
    // dispatch({ type: LOGOUT }); // Xóa trạng thái người dùng
    navigation.navigate('Login'); // Điều hướng tới màn hình đăng nhập
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-all-5.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 bg-black/50 justify-end pb-10 items-center">
        <View className="mb-10 items-center">
          <Text className="text-white font-bold text-3xl tracking-wide">
          <Text className="text-red-500 text-4xl">THỰC ĐƠN </Text>
           tốt nhất
          </Text>
          <Text className="text-white font-bold text-3xl tracking-wide">
            DÀNH CHO BẠN
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogoutAndNavigate} // Xử lý logout và điều hướng
          className="bg-rose-500 flex items-center justify-center mx-auto rounded-full h-14 w-80 border-[2px] border-neutral-200"
        >
          <Text className="text-white text-center tracking-widest font-bold text-xl">
            Bắt đầu
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
