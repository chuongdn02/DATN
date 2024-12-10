import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DashboardScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat navbar
  const screenWidth = Dimensions.get('window').width; // Get screen width for animation
  const translateX = useState(new Animated.Value(screenWidth))[0]; // Initial position off-screen
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const name = useSelector((state) => state.auth.user.user?.name || 'Guest');

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const mockData = useMemo(() => ({
    "2024-12-01": { calories: 1200, carbs: 50, protein: 80, fat: 60 },
    "2024-12-02": { calories: 1500, carbs: 70, protein: 100, fat: 80 },
    "2024-12-03": { calories: 1800, carbs: 90, protein: 120, fat: 100 },
    "2024-12-05": { calories: 800, carbs: 40, protein: 70, fat: 50 },
    "2024-12-08": { calories: 1200, carbs: 50, protein: 80, fat: 60 },
    "2024-12-09": { calories: 1500, carbs: 70, protein: 100, fat: 80 },
    "2024-12-10": { calories: 1800, carbs: 90, protein: 120, fat: 100 },
    "2024-12-14": { calories: 800, carbs: 40, protein: 70, fat: 50 },
  }), []);

  const data = { calories: 1500, carbs: 50, protein: 80, fat: 60 }


  const [dailyStats, setDailyStats] = useState(mockData[selectedDate] || { calories: 0, carbs: 0, protein: 0, fat: 0 });
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setDailyStats(mockData[selectedDate] || { calories: 0, carbs: 0, protein: 0, fat: 0 });
  }, [selectedDate, mockData]);

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
      setGreeting('Chào buổi sáng,');
    } else if (currentHour < 18) {
      setGreeting('Buổi trưa vui vẻ,');
    } else {
      setGreeting('Buổi tối an lành,');
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
  const currentDate = moment(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    currentDate.clone().startOf('week').add(i, 'days')
  );

  return (
    <View className="flex-1 bg-[#1a202c] px-5 ">
      <View className="flex-col">
        <SafeAreaView className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg font-semibold ">Hello 👋</Text>
          </View>
          <View className="flex-row items-center ">
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

        <View className="my-2">
          <Text className="font-bold text-white text-3xl">{greeting} 😊</Text>
          <Text className="font-bold text-rose-500 text-4xl">{name}</Text>
        </View>

        <View className="flex-1 bg-gray-900 p-2 rounded-lg mb-2">
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 items-center mx-2">
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

            <View className="flex-1 items-center  mx-2">
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
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between mb-2">
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
          <Text className="text-gray-400 text-center text-sm">
            {currentDate.format('dddd, DD MMMM YYYY')}
          </Text>
        </View>
        <View className="flex-row my-2">
          <TouchableOpacity
            onPress={() => setActiveTab('Overview')}
            className={`flex-1 py-2 items-center rounded-xl ${activeTab === 'Overview' ? 'bg-[#1A2F55]' : 'bg-transparent'
              }`}
          >
            <Text className={`text-base ${activeTab === 'Overview' ? 'text-white' : 'text-gray-400'}`}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Productivity')}
            className={`flex-1 py-2 items-center rounded-xl ${activeTab === 'Productivity' ? 'bg-[#1A2F55]' : 'bg-transparent'
              }`}
          >
            <Text
              className={`text-base ${activeTab === 'Productivity' ? 'text-white' : 'text-gray-400'
                }`}
            >
              Productivity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'Overview' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-white text-lg font-bold my-2">Recently played</Text>
          ;

          <View className="flex-row flex-wrap justify-between">
            {/* Menu Suggestion */}
            <TouchableOpacity
              onPress={() => console.log('Menu Suggestion clicked')}
              className="bg-green-400/50 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
            >
              <View>
                <Text className="text-white text-2xl font-bold">
                  Menu{'\n'}Suggestion
                </Text>
              </View>
              <View className="flex items-end">
                <Icon name="restaurant-outline" size={50} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Add Calories */}
            <TouchableOpacity
              onPress={() => console.log('Add Calories clicked')}
              className="bg-yellow-400/50 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
            >
              <View>
                <Text className="text-white text-2xl font-bold">
                  Add{'\n'}Calories
                </Text>
              </View>
              <View className="flex items-end">
                <Icon name="fast-food-outline" size={50} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Track Goal */}
            <TouchableOpacity
              onPress={() => navigation.navigate('TrackGoal')}
              className="bg-rose-400/50 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
            >
              <View>
                <Text className="text-white text-2xl font-bold">
                  Track{'\n'}Goal
                </Text>
              </View>
              <View className="flex items-end">
                <Icon name="flag-outline" size={50} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Other Meal Plans */}
            <TouchableOpacity
              onPress={() => console.log('Other Meal Plans clicked')}
              className="bg-orange-400/50 rounded-lg w-[48%] h-40 p-4 mb-5 flex flex-col justify-between"
            >
              <View>
                <Text className="text-white text-2xl font-bold">
                  Other{'\n'}Meal Plans
                </Text>
              </View>
              <View className="flex items-end">
                <Icon name="file-tray-outline" size={50} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
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
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Productivity Content */}
          <Text className="text-white text-lg font-bold my-2">Boost Productivity</Text>
          <View className="flex-row justify-between mb-5">
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={{ uri: 'https://example.com/focus-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Focus session</Text>
              <Text className="text-gray-400 text-sm">30 min</Text>
            </View>
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={{ uri: 'https://example.com/deep-work-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Deep work</Text>
              <Text className="text-gray-400 text-sm">45 min</Text>
            </View>
          </View>
        </ScrollView>
      )}
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
