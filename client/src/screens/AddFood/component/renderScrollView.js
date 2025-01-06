// RenderScrollView.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RenderScrollView = ({ navigation, selected, collapsedSections, foods, yourFoods, toggleCollapse, search, value, date }) => {

    const filteredFoods = foods.filter((food) => food.Name.toLowerCase().includes(search.toLowerCase()));

    const groupedFoods = filteredFoods.reduce((acc, food) => {
        if (!acc[food.Type]) {
            acc[food.Type] = [];
        }
        acc[food.Type].push(food);
        return acc;
    }, {});

    if (selected === 0) {
        return (
            <FlatList
            className="mt-5"
                data={Object.keys(groupedFoods)} // List of food types
                keyExtractor={(item) => item}
                renderItem={({ item: type }) => (
                    <View key={type} className="mx-3 mb-4">
                        <TouchableOpacity
                            onPress={() => toggleCollapse(type)}
                            className="bg-blue-500 rounded-lg p-3 flex-row justify-between items-center"
                        >
                            <Text className="text-white font-bold">{type}</Text>
                            <Icon
                                name={collapsedSections[type] ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                        {!collapsedSections[type] && (
                            <FlatList
                                data={groupedFoods[type]}
                                keyExtractor={(food) => food._id}
                                renderItem={({ item: food }) => (
                                    <TouchableOpacity
                                        key={food._id}
                                        onPress={() => navigation.navigate('DFood', { food: food, value: value, date: date })}
                                        className="p-3 bg-white rounded-lg shadow mt-2"
                                    >
                                        <Text className="font-bold text-gray-900">{food.Name}</Text>
                                        <Text className="text-gray-600">
                                            Calories: {food.Calories} | Protein: {food.Protein}g |
                                            Carbs: {food.Carbs}g | Fats: {food.Fats}g
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                )}
            />
        );
    }

    if (selected === 1) {
        const myFoods = yourFoods.filter((food) =>
            food.Name.toLowerCase().includes(search.toLowerCase())
        );

        return (
            <FlatList
                className="mt-4"
                data={myFoods}
                keyExtractor={(food) => food._id}
                renderItem={({ item: food }) => (
                    <TouchableOpacity
                        key={food._id}
                        onPress={() => navigation.navigate('DFood', { food: food, value: value, date: date })}
                        className="mx-4 p-3 bg-white rounded-lg shadow mt-2"
                    >
                        <Text className="font-bold text-gray-900">{food.Name}</Text>
                        <Text className="text-gray-600">
                            Calories: {food.Calories} | Protein: {food.Protein}g |
                            Carbs: {food.Carbs}g | Fats: {food.Fats}g
                        </Text>
                    </TouchableOpacity>
                )}
            />
        );
    }

    if (selected === 2) {
        const myMenuFoods = filteredFoods.filter((food) => food.isInMyMenu);
        
        return (
            <FlatList
                data={myMenuFoods} // My menu foods filtered by search
                keyExtractor={(food) => food._id}
                renderItem={({ item: food }) => (
                    <View key={food._id} className="p-3 bg-white rounded-lg shadow mt-2">
                        <Text className="font-bold text-gray-900">{food.Name}</Text>
                        <Text className="text-gray-600">
                            Calories: {food.Calories} | Protein: {food.Protein}g |
                            Carbs: {food.Carbs}g | Fats: {food.Fats}g
                        </Text>
                    </View>
                )}
            />
        );
    }

    return null;
};

export default RenderScrollView;
