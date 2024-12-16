import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const posts = [
  {
    id: '1',
    user: 'Liverpool FC',
    avatar: 'https://via.placeholder.com/50',
    content: "Đêm UCL với Quỷ Đỏ trở lại năm '07 🏆",
    image: 'https://via.placeholder.com/300',
    likes: 148,
    comments: 51,
    shares: 10,
  },
  {
    id: '2',
    user: 'Liverpool FC',
    avatar: 'https://via.placeholder.com/50',
    content: "Đêm UCL với Quỷ Đỏ trở lại năm '07 🏆",
    image: 'https://via.placeholder.com/300',
    likes: 148,
    comments: 51,
    shares: 10,
  },
  {
    id: '3',
    user: 'Liverpool FC',
    avatar: 'https://via.placeholder.com/50',
    content: "Đêm UCL với Quỷ Đỏ trở lại năm '07 🏆",
    image: 'https://via.placeholder.com/300',
    likes: 148,
    comments: 51,
    shares: 10,
  },
];

const ProfileScreen = () => {


  const renderPost = ({ item }) => (
    <View className="bg-white/20 rounded-lg my-1 p-2" style={{ height: 350 }}>
      <View className="flex-row items-center">
        <Image source={{ uri: item.avatar }} className="w-10 h-10 rounded-full mr-2" />
        <Text className="font-bold text-rose-500">{item.user}</Text>
      </View>
      <Text className="my-2 text-white">{item.content}</Text>
      <Image source={{ uri: item.image }} className="w-full h-48 rounded-lg" />
      <View className="flex-row justify-between my-2">
        <Text className="text-white">{item.likes} Likes</Text>
        <Text className="text-white">{item.comments} Comments</Text>
        <Text className="text-white">{item.shares} Shares</Text>
      </View>
    </View>
  );
  return (
    <View className="flex-1 bg-[#1a202c]">
      <SafeAreaView className="flex-1">
        <View className="flex items-center ">
          <Image
            source={require('../../assets/images/bg-all-1.jpg')}
            className="h-52"
          />

          <TouchableOpacity className="items-center justify-end flex-1 flex-row left-28 bottom-12 rounded-lg bg-white p-1">
            <Icon name="camera-outline" size={24} color="#000" />
            <Text className="text-black ml-2">Cập nhật ảnh bìa</Text>
          </TouchableOpacity>
        </View>

        <View className=" p-2 bottom-28 flex-1" >
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/images/bg-all-2.jpg')}
              className=" rounded-full w-40 h-40 border-[5px]  border-[#1a202c]"
            />
            <View className="flex p-5 top-14">
              <Text className="text-white/50 ">Cân nặng ban đầu:
                <Text className="text-green-500 font-bold text-lg"> 50 </Text>(kg)
              </Text>
              <Text className="text-white/50 ">Cân nặng mục tiêu:
                <Text className="text-green-500 font-bold text-lg"> 43 </Text>(kg)
              </Text>
              <Text className="text-white/50 ">Cân nặng hiện tại:
                <Text className="text-green-500 font-bold text-lg"> 45 </Text>(kg)
              </Text>
              <Text className="text-white/50 ">Bạn đã Giảm:
                <Text className="text-green-500 font-bold text-lg"> 2 </Text>(kg)
              </Text>
              <TouchableOpacity className="items-center justify-center h-8 flex-1 flex-row rounded-lg bg-green-500 m-2">
                <Icon name="pencil-outline" size={24} color="#000" />
                <Text className="text-white ml-2">Cập nhật cân nặng</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-center w-40 font-bold text-xl text-white">Nguyen Chuong</Text>
        </View>
        <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        className="p-2 border-white "
        renderItem={renderPost}
      />
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
