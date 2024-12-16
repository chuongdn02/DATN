import React from 'react';
import { View, Text, Image, FlatList, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const stories = [
  { id: '2', user: 'Quỳnh Trịnh', avatar: 'https://via.placeholder.com/300',image: 'https://via.placeholder.com/300' },
  { id: '3', user: 'Nguyễn Huy Hoàng', avatar: 'https://via.placeholder.com/300',image: 'https://via.placeholder.com/300' },
  { id: '4', user: 'Tín Nguyễn', avatar: 'https://via.placeholder.com/300',image: 'https://via.placeholder.com/300' },
];

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

const BlogScreen = ({ navigation }) => {


  const handleImageClick = (user, avatar, image) => {
    navigation.navigate('News', { user, avatar, image });
  };

  const renderStory = ({ item }) => (
    <View className="items-center mx-3 w-20 h-32">
      <TouchableOpacity onPress={() => handleImageClick(item.user, item.avatar, item.image)}>
        <View className="border-[3px] border-white rounded-full mb-1 p-1">
          <Image source={{ uri: item.avatar }} className="w-20 h-20 rounded-full" />
        </View>
        <Text className="text-xs text-white text-center" numberOfLines={1} ellipsizeMode="tail">
          {item.user}
        </Text>
      </TouchableOpacity>
    </View>
  );

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
    <SafeAreaView className="flex-1 bg-[#1a202c]">
      {/* Header */}
      <View className="flex-row justify-between p-2 items-center">
        <View>
          <Text className="text-white text-2xl font-bold">Blog</Text>
          <Text className="text-rose-500 text-2xl font-bold">Food & Meal</Text>
        </View>

        <View className="flex-col items-end">
          <View className="mb-2 flex-row items-center w-60">
            <TextInput
              placeholder="Search"
              placeholderTextColor="#FFFFFF"
              className="bg-gray-700 text-white p-2 rounded-full flex-1 mr-2"
            />
            <Icon name="search" size={20} color="#FFFFFF" />
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate('CreatePost')}
              className="flex-row items-center bg-green-500 p-2 rounded-lg"
            >
              <Text className="text-white font-bold mr-2">Create post</Text>
              <Icon name="plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-row">
        <View>
          <View className="items-center mx-2">
            <TouchableOpacity onPress={handleImageClick}>
              <View className="border-[3px] border-white rounded-full mb-1 p-1">
                <Image
                  source={{ uri: 'https://via.placeholder.com/300' }}
                  className="w-20 h-20 rounded-full"
                />
                <View className="absolute bottom-8 left-9">
                  <Icon name="plus" size={20} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-xs text-white text-center" numberOfLines={1} ellipsizeMode="tail">
              Tạo tin
            </Text>
          </View>
        </View>
        <FlatList
          horizontal
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderStory}
          className="px-1"
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        className="p-2 border-white border-b-2"
        renderItem={renderPost}
      />
    </SafeAreaView>
  );
};

export default BlogScreen;
