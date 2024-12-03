import { View, TouchableOpacity, Image, Text, TextInput, ImageBackground } from 'react-native';
import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser(email, password))
      .then((response) => {
        if (response.type === 'LOGIN_SUCCESS') {
          navigation.navigate('GetInfo');
        } else {
          alert(response.payload);
        }
      })
      .catch((error) => {
        alert('Login error. Please try again later.');
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
            onPress={() => navigation.navigate('Welcome')}
            className="bg-yellow-400/80  border-[1px] border-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon
              size={20} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
      className="flex-1 px-8 pt-8 bg-white/50 rounded-tl-[50px] rounded-tr-[50px] mt-52"
      >
        <View className="form space-y-2">
          <Text className="text-white ml-4">Địa chỉ email</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập tài khoản"
          />
           <Text className="text-white ml-4">Mật khẩu</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Nhập mật khẩu"
          />
          <TouchableOpacity
          className="flex items-end mb-5"
          >
            <Text className="text-gray-700">
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          className="bg-rose-500 p-3 rounded-full mb-3 border-[2px] border-neutral-200"
          onPress={handleLogin}
          >
            <Text className="font-bold text-center text-white ">Đăng Nhập</Text>
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
              Chưa có tài khoản?
            </Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-yellow-300 font-bold"> Đăng kí</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
    </ImageBackground>
  );

};
export default LoginScreen;
