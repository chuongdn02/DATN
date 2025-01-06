import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllExercise } from '../../store/actions/exerciseAction'; // Import action để lấy bài tập
import Icon from 'react-native-vector-icons/MaterialIcons';

const All_Exercise = ({ navigation }) => {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const loading = useSelector((state) => state.exercises.loading);
  const error = useSelector((state) => state.exercises.error);

  const [searchQuery, setSearchQuery] = useState(''); // To hold the search input
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    dispatch(AllExercise());
  }, [dispatch]);

  // Filter exercises based on the search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredExercises(exercises); // Show all exercises if no query
    } else {
      const filtered = exercises.filter((exercise) =>
        exercise.Name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        exercise.Type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  }, [searchQuery, exercises]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl text-white">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl text-red-500">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1a202c]">
      <View className="flex-row items-center mb-4 mt-14 px-4">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold right-6 text-white flex-1 text-center">
          Tất cả bài tập
        </Text>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <TextInput
          style={{
            backgroundColor: '#2D3748',
            padding: 10,
            borderRadius: 8,
            color: 'white',
          }}
          placeholder="Tìm kiếm bài tập..."
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Render List */}
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-[#2D3748] p-4 mb-4 mx-2 rounded-lg"
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item ,date: new Date() })}
          >
            <Text className="text-lg font-semibold text-white">{item.Name}</Text>
            <View className="flex-row items-center mt-2">
              <Icon name="fitness-center" size={20} color="white" className="mr-2" />
              <Text className="text-sm text-white">{item.Type}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.Name}
      />
    </View>
  );
};

export default All_Exercise;
