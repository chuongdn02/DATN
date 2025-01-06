import { View, Text, FlatList, TouchableOpacity, SectionList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllExercise } from '../../store/actions/exerciseAction'; // Import action để lấy bài tập
import Icon from 'react-native-vector-icons/MaterialIcons';

const All_Add_Ex = ({ navigation,route }) => {
    const {  date } = route.params;
    const dispatch = useDispatch();
    const exercises = useSelector((state) => state.exercises.exercises);
    const loading = useSelector((state) => state.exercises.loading);
    const error = useSelector((state) => state.exercises.error);

    const [groupedExercises, setGroupedExercises] = useState([]);
    const [expanded, setExpanded] = useState({}); // To manage expanded/collapsed state of each type

    useEffect(() => {
        dispatch(AllExercise());
    }, [dispatch]);

    // Group exercises by type
    useEffect(() => {
        if (exercises) {
            const grouped = exercises.reduce((acc, curr) => {
                if (!acc[curr.Type]) {
                    acc[curr.Type] = [];
                }
                acc[curr.Type].push(curr);
                return acc;
            }, {});

            const groupedArray = Object.keys(grouped).map((key) => ({
                title: key,
                data: grouped[key],
            }));

            setGroupedExercises(groupedArray);
        }
    }, [exercises]);

    const handleToggleExpand = (type) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [type]: !prevExpanded[type], // Toggle the expansion state
        }));
    };

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
            <View className="flex-row items-center mb-4 mt-14">
                <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold right-6 text-white flex-1 text-center">
                    Tất cả bài tập
                </Text>
            </View>

            <SectionList
                sections={groupedExercises}
                keyExtractor={(item, index) => item.Name + index}
                renderSectionHeader={({ section: { title } }) => (
                    <TouchableOpacity
                        className="bg-[#2D3748] p-4 mb-2 rounded-lg"
                        onPress={() => handleToggleExpand(title)}
                    >
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-semibold text-white">
                                {title === 'Cardio' ? 'Cardio' :
                                    title === 'Power' ? 'Thể lực' :
                                        title === 'Routines' ? 'Thể dục' :
                                            title} 
                            </Text>

                            <Icon
                                name={expanded[title] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                size={24}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                )}
                renderItem={({ item }) => {
                    return (
                        expanded[item.Type] && ( // Only show items when their type category is expanded
                            <TouchableOpacity
                                className="bg-[#2D3748] p-4 mb-4 mx-2 rounded-lg"
                                onPress={() => navigation.navigate('ExerciseDetail', { exercise: item, date:date })}
                            >
                                <Text className="text-lg font-semibold text-white">{item.Name}</Text>
                                <View className="flex-row items-center mt-2">
                                    <Icon name="fitness-center" size={20} color="white" className="mr-2" />
                                    <Text className="text-sm text-white">{item.Type}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    );
                }}
            />
        </View>
    );
};

export default All_Add_Ex;
