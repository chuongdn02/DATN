import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchUserRecords, getAllMeal } from '../../store/actions/authActions';
import { AllFood } from '../../store/actions/foodAction';
import { calculateBMRAction } from '../../store/actions/recordAction';
import { sendMessage } from '../../store/actions/chatActions';
import DailyStats from './Components/DailyStats';
import Category from './Components/Category';
import DateSelector from './Components/DateSelector';


const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const translateX = useState(new Animated.Value(screenWidth))[0];
  const [message, setMessage] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const name = useSelector((state) => state.auth.user.user?.name);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.user.userId);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const data = useSelector((state) => state.record.data);

  const dishes = useSelector((state) => state.auth.userMeals.meals);

  const mockData = (!dishes || dishes.length === 0)
    ? []
    : dishes.map(dish => ({
      date: moment(dish.date).format('YYYY-MM-DD'),
      calories: dish.Calories || 0,
      carbs: dish.Carbs || 0,
      protein: dish.Protein || 0,
      fat: dish.Fats || 0,
      type: dish.type, // make sure to keep type in the object
    }));

const calculateTotalStatsForDate = (date) => {
  const selectedDishes = mockData.filter(dish => dish.date === date);

  const totalStats = selectedDishes.reduce((totals, dish) => {
    // Only accumulate if dish type is not 'exercise'
    if (dish.type !== 'exercise') {
      totals.calories += dish.calories;
      totals.carbs += dish.carbs || 0;
      totals.protein += dish.protein || 0;
      totals.fat += dish.fat || 0;
    }
    return totals;
  }, { calories: 0, carbs: 0, protein: 0, fat: 0 });

  return totalStats;
};


  const dailyStats = calculateTotalStatsForDate(selectedDate);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRecords(userId));
      dispatch(calculateBMRAction(userId));
      dispatch(AllFood());
      dispatch(getAllMeal(userId));
    }
  }, [dispatch, userId]);

  const sendChatMessage = async () => {
    if (message.trim()) {
      dispatch(sendMessage(message));
      setMessage('');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [isChatOpen, messages]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Buổi sáng tốt lành,');
    } else if (currentHour < 18) {
      setGreeting('Buổi chiều vui vẻ,');
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
        <View className="flex-row justify-between items-center mt-14">
          <View>
            <Text className="text-white text-lg font-semibold ">Xin chào 👋</Text>
          </View>
          <View className="flex-row items-center "
            onPress={() => navigation.navigate('Root', { screen: 'Profile' })} 
          >
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
        </View>

        <View className="my-2">
          <Text className="font-bold text-white text-3xl">{greeting} 😊</Text>
          <Text className="font-bold text-rose-500 text-4xl">{name}</Text>
        </View>

        <View className="flex-1 bg-gray-900 p-2 rounded-lg mb-2">
          <View className="flex-row justify-between mb-4">
            <DailyStats stats={dailyStats} data={data} />
          </View>
        </View>
        <View className="flex-1">
          <DateSelector weekDays={weekDays} selectedDate={selectedDate} handleDateSelect={handleDateSelect} />
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
              Dinh dưỡng
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
              Tập luyện
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'Overview' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-white text-lg font-bold my-2">Danh mục</Text>
          <Category navigation={navigation} date={selectedDate} />

          <Text className="text-white text-lg font-bold my-2">Sở thích của bạn</Text>
          <View className="flex-row justify-between mb-5">
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={{ uri: 'https://example.com/train-your-mind-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Món ăn yêu thích</Text>
              <Text className="text-gray-400 text-sm">10 min</Text>
            </View>
            <View className="bg-[#1C2D5A] rounded-lg w-[48%] p-3">
              <Image
                source={{ uri: 'https://example.com/sunset-image.png' }}
                className="w-full h-24 rounded-lg mb-2"
              />
              <Text className="text-white text-base font-bold">Thực đơn yêu thích</Text>
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
          <Text className="text-white text-lg font-bold my-2">Tập luyện</Text>
          <View>
            <View className="flex-row justify-between ">
              <TouchableOpacity onPress={() => navigation.navigate('AllEx')} className="flex-row justify-between mb-5 ">
                <View className="bg-[#1C2D5A] rounded-lg w-[70%] p-3">
                  <Image
                    source={{ uri: 'https://goalfive.com/cdn/shop/articles/ytocviog.jpg?v=1647957869&width=1500' }}
                    className="h-24 w-full rounded-lg mb-2"
                  />
                  <Text className="text-white text-base font-bold">Tất cả bài tập</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cardio')} className="flex-row justify-between right-16 mb-5">
                <View className="bg-[#1C2D5A] rounded-lg w-[70%] p-3" >
                  <Image
                    source={{ uri: 'https://www.puregym.com/media/sqflb0zc/bodyweight.jpg?quality=80' }}
                    className="w-full h-24 rounded-lg mb-2"
                  />
                  <Text className="text-white text-base font-bold">Tập cardio</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between mb-5">
              <TouchableOpacity onPress={() => navigation.navigate('Power')} className="flex-row justify-between mb-5 ">
                <View className="bg-[#1C2D5A] rounded-lg w-[70%] p-3">
                  <Image
                    source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D12AQFhCV1IoIkYgw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1629733850803?e=2147483647&v=beta&t=7vV9v2Ef_qVynpFqUY0ZfSsozWDB3vx6hb0OKAUj78E' }}
                    className="w-full h-24 rounded-lg mb-2"
                  />
                  <Text className="text-white text-base font-bold">Tập Thể lực</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Routine')} className="flex-row justify-between right-16 mb-5">
                <View className="bg-[#1C2D5A] rounded-lg w-[70%] p-3" >
                  <Image
                    source={{ uri: 'https://cdn.shopify.com/s/files/1/0430/6533/files/diXrhtL1D7sVk35iU6TvEGLblXP8jZ011599238853.jpg?v=1600126266' }}
                    className="w-full h-24 rounded-lg mb-2"
                  />

                  <Text className="text-white text-base font-bold">Tập Thể dục</Text>
                </View>
              </TouchableOpacity>
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
            <Text className="text-rose-500 text-2xl font-bold">Bot dinh dưỡng</Text>
            <Text className="text-white text-lg font-bold mb-5">Tôi có thể giúp gì cho bạn?</Text>

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
              <TouchableOpacity onPress={sendChatMessage}>
                <Icon name="send-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeScreen;
