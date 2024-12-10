import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';

const TrackGoalScreen = ({navigation}) => {
    const data = [
        { weight: 52, alt: 'start' },
        { weight: 51.5, alt: 'current' },
        { weight: 47, alt: 'goal' },
    ];

    // Define scales for x and y axes
    const xScale = scaleLinear()
        .domain([0, data.length - 1]) // From 0 to the last index of the data array
        .range([15, 285]); // Set the range for the x-axis, dividing the space evenly

    const yScale = scaleLinear()
        .domain([
            Math.min(...data.map((d) => d.weight)) - 2,
            Math.max(...data.map((d) => d.weight)) + 2,
        ]) // Add padding to avoid clipping
        .range([150, 0]);

    const lineGenerator = line()
        .x((d, index) => xScale(index)) // Use index for x value instead of date
        .y((d) => yScale(d.weight))
        .curve(curveCardinal.tension(0.9));

    return (
        <SafeAreaView className="bg-black flex-1">
            <View className="flex-1  px-4">
                {/* Header */}
                <View className="flex-row justify-between items-center mt-4">
                    <TouchableOpacity>
                        <Text className="text-white text-2xl">{'<'}</Text>
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-bold">Track Goal</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
                        <Text className="text-teal-400 text-base">Add Weight+</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Message */}
                <Text className="text-green-400 text-xl font-bold my-4 text-center">
                    You are doing well!
                </Text>

                {/* Weight Cards */}
                <View className="flex-row justify-between mb-4">
                    <View className="flex-1 mx-2 items-center p-4 rounded-lg bg-neutral-900">
                        <Text className="text-white text-sm">Current Weight</Text>
                        <Text className="text-red-400 text-lg font-bold">51.0 Kg</Text>
                    </View>
                    <View className="flex-1 mx-2 items-center p-4 rounded-lg bg-neutral-900">
                        <Text className="text-white text-sm">Maintain Weight</Text>
                        <Text className="text-white text-lg font-bold">0 Kg</Text>
                    </View>
                </View>

                {/* Goal vs Actual Toggle */}
                <View className="flex-row justify-center mb-4">
                    <TouchableOpacity className="px-4 py-2 rounded-lg bg-teal-400">
                        <Text className="text-black">Goal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-4 py-2 rounded-lg bg-neutral-700 ml-2">
                        <Text className="text-white">Actual</Text>
                    </TouchableOpacity>
                </View>

                {/* Graph */}
                <View className="items-center mb-4 p-4 bg-neutral-900 rounded-lg">
                    <Svg height="200" width="300">
                        {/* Line Path */}
                        <Path
                            d={lineGenerator(data)}
                            fill="none"
                            stroke="#00FFAA"
                            strokeWidth={5}
                        />
                        {/* Circles and Labels on Data Points */}
                        {data.map((point, index) => (
                            <React.Fragment key={index}>
                                {/* Circle */}
                                <Circle
                                    cx={xScale(index)} // Use index to position the circle
                                    cy={yScale(point.weight)}
                                    r={5}
                                    fill="#FF5555"
                                />
                                {/* Label */}
                                <SvgText
                                    x={xScale(index)} // Use index to position the label
                                    y={yScale(point.weight) - 15} // Slightly above the circle
                                    fontSize={10}
                                    fill="#C0C0C0"
                                    textAnchor="middle"
                                >
                                    {point.alt}
                                </SvgText>
                            </React.Fragment>
                        ))}
                    </Svg>
                </View>

                {/* Weight Details */}
                <View className="flex-row justify-between mb-4">
                    {data.map((item, index) => (
                        <View key={index} className="items-center">
                            <Text className="text-white text-sm">{item.alt.toUpperCase()}</Text>
                            <Text className="text-red-400 text-base font-bold">{`${item.weight} Kg`}</Text>
                        </View>
                    ))}
                </View>

                {/* Entries List */}
                <View className="mt-4 flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-base font-bold">Entries</Text>
                        <TouchableOpacity className="p-2 rounded-lg bg-neutral-700">
                            <Text className="text-teal-400 text-sm">+Create Collage</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={data.map((item, index) => ({
                            id: index.toString(),
                            weight: `${item.weight} Kg`,
                            alt: item.alt,
                            image: 'https://via.placeholder.com/50', // Replace with actual image
                        }))}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View className="flex-row items-center mb-4">
                                <Image
                                    source={{ uri: item.image }}
                                    className="w-12 h-12 rounded-lg mr-4"
                                />
                                <View>
                                    <Text className="text-white text-base font-bold">
                                        {item.weight}
                                    </Text>
                                    <Text className="text-gray-400 text-sm">{item.alt}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TrackGoalScreen;
