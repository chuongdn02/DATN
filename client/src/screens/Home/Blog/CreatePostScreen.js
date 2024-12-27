import React, { useState } from 'react';
import {  Text, TextInput, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native';


const CreatePostScreen = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePick = () => {
    // For now, we will just simulate image picking. In a real app, you can use ImagePicker or similar.
    setImage('https://via.placeholder.com/300');
  };

  const handlePostSubmit = () => {
    // Handle post submission logic here
    console.log("Post content:", content);
    console.log("Image URL:", image);
    navigation.goBack(); // Go back to the previous screen after post creation
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1a202c] p-4">
      <Text className="text-white text-2xl font-bold mb-4">Create a Post</Text>

      <TextInput
        placeholder="Write your post content here..."
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        className="bg-gray-700 text-white p-4 rounded-md mb-4"
        value={content}
        onChangeText={setContent}
      />

      {/* Image Upload Section */}
      <TouchableOpacity onPress={handleImagePick} className="border-dashed border-2 border-white rounded-md p-4 mb-4">
        {image ? (
          <Image source={{ uri: image }} className="w-full h-60 rounded-md" />
        ) : (
          <Text className="text-white text-center">Pick an image</Text>
        )}
      </TouchableOpacity>

      <Button
        title="Submit Post"
        onPress={handlePostSubmit}
        color="#4CAF50"
      />
    </SafeAreaView>
  );
};

export default CreatePostScreen;
