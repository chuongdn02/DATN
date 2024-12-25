import { View, TouchableOpacity, Image, Text, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(registerUser(name, email, password))
      .then((response) => {
        if (response.type === 'REGISTER_SUCCESS') {
          alert('Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.');
          navigation.navigate('Login');
        } else {
          alert(response.payload);
        }
      })
      .catch((error) => {
        alert('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
      });
  };

  return (
    <ImageBackground
    source={require('../../assets/images/bg-all.jpg')} // Đường dẫn ảnh nền
    className="flex-1"
    resizeMode="cover"
  >
    <View className="flex-1">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400/80  border-[1px] border-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon
              size={20} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
      className="flex-1 px-8 pt-8 bg-white/50 rounded-t-[50px] mt-32"
      >
        <View className="form space-y-2">
          <Text className="text-white ml-4">Tên</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            onChangeText={setName}
            value={name}
            placeholder="Nhập tên của bạn"
          />
           <Text className="text-white ml-4"> Địa chỉ email</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            onChangeText={setEmail}
            value={email}
            placeholder="nhập email của bạn"
          />
           <Text className="text-white ml-4">Mật khẩu</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-8"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu của bạn"
          />
          <TouchableOpacity
          onPress={handleRegister}
          className="bg-rose-500 p-3 rounded-full mb-3 border-[2px] border-neutral-200"
          >
            <Text className="font-bold text-center text-white">Đăng kí</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-bold text-center text-gray-700 py-5">OR</Text>
        <View className="flex-row justify-center space-x-6">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-2xl">
            <Image source={require('../../assets/images/google.png')}
              className="w-[30px] h-[30px]" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 p-2 rounded-2xl">
            <Image source={require('../../assets/images/facebook.png')}
              className="w-[30px] h-[30px]" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 p-2 rounded-2xl">
            <Image source={require('../../assets/images/apple.png')}
              className="w-[30px] h-[30px]" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text
              className="text-gray-700 font-semibold">
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Login')}>
              <Text className="text-yellow-300 font-bold"> Đăng nhập</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
    </ImageBackground>
  );
};
export default SignUpScreen;
