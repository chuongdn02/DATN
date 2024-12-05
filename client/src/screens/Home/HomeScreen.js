import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DashboardScreen = () => {
  const [greeting, setGreeting] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat navbar
  const screenWidth = Dimensions.get('window').width; // Get screen width for animation
  const translateX = useState(new Animated.Value(screenWidth))[0]; // Initial position off-screen
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const name = useSelector((state) => state.auth.user.user?.name || 'Guest');

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  // Memoizing mockData to prevent unnecessary re-renders
  const mockData = useMemo(() => ({
    "2024-12-01": { calories: 1200, carbs: 50, protein: 80, fat: 60 },
    "2024-12-02": { calories: 1500, carbs: 70, protein: 100, fat: 80 },
    "2024-12-03": { calories: 1800, carbs: 90, protein: 120, fat: 100 },
    "2024-12-04": { calories: 800, carbs: 40, protein: 70, fat: 50 },
  }), []);

  const data = { calories: 1500, carbs: 50, protein: 80, fat: 60 }


  const [dailyStats, setDailyStats] = useState(mockData[selectedDate] || { calories: 0, carbs: 0, protein: 0, fat: 0 });
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // Update dailyStats whenever selectedDate or mockData changes
    setDailyStats(mockData[selectedDate] || { calories: 0, carbs: 0, protein: 0, fat: 0 });
  }, [selectedDate, mockData]); // Add mockData to the dependency array

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      setMessage('');
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a system response to your message.', sender: 'system' },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning,');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon,');
    } else {
      setGreeting('Good evening,');
    }
  }, []);

  const toggleChatNavbar = () => {
    if (isChatOpen) {
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsChatOpen(false));
    } else {
      setIsChatOpen(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Tạo tuần hiện tại
  const currentDate = moment(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    currentDate.clone().startOf('week').add(i, 'days')
  );

  return (
    <View className="flex-1 bg-[#1a202c] px-5">
      <SafeAreaView className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg font-semibold mb-1">Hello 👋</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={toggleChatNavbar}>
            <Icon name="chatbubble-ellipses-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              className="w-12 h-12 rounded-full border-2 border-white ml-2"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View className="flex-col my-5">
        <Text className="font-bold text-white text-3xl">{greeting} 😊</Text>
        <Text className="font-bold text-rose-500 text-4xl">{name}</Text>
      </View>

      <View className="flex-1 bg-gray-900 p-2 rounded-lg">
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 items-center">
            <Text className="text-white text-base font-bold">{dailyStats.calories}/{data.calories}</Text>
            <Text className="text-gray-400 text-sm">Calo (kCal)</Text>
            <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
              <View
                className="h-2 bg-yellow-400 rounded-full"
                style={{
                  width: `${(dailyStats.calories / 2418) * 100}%`,
                  maxWidth: '100%',
                }}
              />
            </View>
          </View>

          <View className="flex-1 items-center mx-2">
            <Text className="text-white text-base font-bold">{dailyStats.carbs}/{data.carbs}</Text>
            <Text className="text-gray-400 text-sm">Carbs (g)</Text>
            <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
              <View
                className="h-2 bg-green-500 rounded-full"
                style={{
                  width: `${(dailyStats.carbs / 300) * 100}%`,
                  maxWidth: '100%',
                }}
              />
            </View>
          </View>

          <View className="flex-1 items-center mx-2">
            <Text className="text-white text-base font-bold">{dailyStats.protein}/{data.protein}</Text>
            <Text className="text-gray-400 text-sm">Protein (g)</Text>
            <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
              <View
                className="h-2 bg-red-500 rounded-full"
                style={{
                  width: `${(dailyStats.protein / 150) * 100}%`,
                  maxWidth: '100%',
                }}
              />
            </View>
          </View>

          <View className="flex-1 items-center">
            <Text className="text-white text-base font-bold">{dailyStats.fat}/{data.fat}</Text>
            <Text className="text-gray-400 text-sm">Fat (g)</Text>
            <View className="w-full h-2 bg-gray-700 rounded-full mt-2">
              <View
                className="h-2 bg-orange-500 rounded-full"
                style={{
                  width: `${(dailyStats.fat / 70) * 100}%`,
                  maxWidth: '100%',
                }}
              />
            </View>
          </View>
        </View>
        <View className="flex-row justify-between mb-4">
          {weekDays.map((day, index) => (
            <View key={index} className="items-center">
              <Text className="text-gray-400 text-sm">{day.format('ddd').toUpperCase()}</Text>
              <TouchableOpacity
                onPress={() => handleDateSelect(day.format('YYYY-MM-DD'))}
                className={`w-10 h-10 rounded-full items-center justify-center mt-2 ${selectedDate === day.format('YYYY-MM-DD') ? 'bg-green-500' : 'bg-transparent'
                  }`}
              >
                <Text
                  className={`text-sm ${selectedDate === day.format('YYYY-MM-DD')
                    ? 'text-white font-bold'
                    : 'text-gray-400'
                    }`}
                >
                  {day.format('D')}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Ngày hiện tại */}
        <Text className="text-gray-400 text-center text-sm">
          {currentDate.format('dddd, DD MMMM YYYY')}
        </Text>
      </View>

      <View className="flex-row my-5 mt-32">
        <TouchableOpacity className="flex-1 py-2 items-center rounded-xl bg-[#1A2F55]">
          <Text className="text-white text-base">Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-2 items-center rounded-xl">
          <Text className="text-white text-base">Productivity</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-white text-lg font-bold my-2">Recently played</Text>
        <View className="flex-row justify-between mb-5">
          <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
            <Image
              source={require('../../assets/images/bg-all.jpg')}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Daily calm</Text>
            <Text className="text-gray-400 text-sm">10 min</Text>
          </View>
          <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
            <Image
              source={require('../../assets/images/person.png')}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Stay happy</Text>
            <Text className="text-gray-400 text-sm">10 min</Text>
          </View>
        </View>
        <View className="flex-row justify-between mb-5">
          <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
            <Image
              source={require('../../assets/images/bg-all.jpg')}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Daily calm</Text>
            <Text className="text-gray-400 text-sm">10 min</Text>
          </View>
          <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
            <Image
              source={require('../../assets/images/person.png')}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Stay happy</Text>
            <Text className="text-gray-400 text-sm">10 min</Text>
          </View>
        </View>

        {/* Favorites Section */}
        <Text className="text-white text-lg font-bold my-2">Your favorites</Text>
        <View className="flex-row justify-between mb-5">
          <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
            <Image
              source={{ uri: 'https://example.com/train-your-mind-image.png' }}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Train your mind</Text>
            <Text className="text-gray-400 text-sm">10 min</Text>
          </View>
          <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
            <Image
              source={{ uri: 'https://example.com/sunset-image.png' }}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Sunset vibes</Text>
            <Text className="text-gray-400 text-sm">10 min</Text>
          </View>
        </View>
        <Text className="text-white text-lg font-bold my-2">Explore more</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          <View className="bg-[#1C2D5A] rounded-lg w-36 p-3 mr-3">
            <Image
              source={{ uri: 'https://example.com/explore-1-image.png' }}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Morning vibes</Text>
          </View>
          <View className="bg-[#1C2D5A] rounded-lg w-36 p-3 mr-3">
            <Image
              source={{ uri: 'https://example.com/explore-2-image.png' }}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Relaxation</Text>
          </View>
          <View className="bg-[#1C2D5A] rounded-lg w-36 p-3">
            <Image
              source={{ uri: 'https://example.com/explore-3-image.png' }}
              className="w-full h-24 rounded-lg mb-2"
            />
            <Text className="text-white text-base font-bold">Focus time</Text>
          </View>
        </ScrollView>
      </ScrollView>

      {isChatOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: screenWidth * 0.8,
            backgroundColor: '#1A2F55',
            transform: [{ translateX }],
            padding: 20,
            borderBottomLeftRadius: 50,
          }}
        >
          <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={toggleChatNavbar}>
              <Icon name="close-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Chat</Text>
            <Text className="text-white text-lg font-bold mb-5">What can I help with?</Text>

            {/* Chat Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={{ flex: 1, marginBottom: 10 }}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              {messages.map((msg, index) => (
                <View
                  key={index}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? '#2575FC' : '#232429',
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 10,
                    maxWidth: '80%',
                  }}
                >
                  <Text className="text-white ">{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View className="flex-row items-center bg-blue-900 rounded-full mb-2 px-3 py-2">
              <TextInput
                style={{
                  flex: 1,
                  color: '#FFFFFF',
                  fontSize: 16,
                  marginRight: 10,
                }}
                placeholder="Type your message..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Icon name="send-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </View>
  );
};

export default DashboardScreen;
