import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity, FlatList, Image, SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';

const TrackGoalScreen = ({ navigation }) => {

    // const [records, setRecords] = useState([]);
    const [viewGoal, setViewGoal] = useState(false);

    const records = useSelector((state) => state.auth.records.records);

    const enhancedRecords = [...records];
    if (records.length > 0 && records[records.length - 1].goal_weight) {
        const currentWeight = records[records.length - 1].weight;
        const goalWeight = records[records.length - 1].goal_weight;
        const intensity = records[records.length - 1].intensity;
        let weightChangePer7Days = 0;
        if (intensity === 'low') {
            weightChangePer7Days = 0.25;
        } else if (intensity === 'medium') {
            weightChangePer7Days = 0.5;
        } else if (intensity === 'high') {
            weightChangePer7Days = 1;
        }
        const weightDifference = Math.abs(currentWeight - goalWeight);
        const daysToReachGoal = (weightDifference / weightChangePer7Days) * 7;
        const targetDate = new Date(records[records.length - 1].time);
        targetDate.setDate(targetDate.getDate() + Math.ceil(daysToReachGoal));
        enhancedRecords.push({
            ...records[records.length - 1],
            weight: goalWeight,
            time: targetDate,
        });
    }

    // useEffect(() => {
    //     if (fetchedRecords?.length > 0) {
    //         setRecords(fetchedRecords);
    //     }
    // }, [fetchedRecords]);

    const xScale = scaleLinear()
        .domain([0, (viewGoal ? enhancedRecords : records).length - 1])
        .range([28, 272]);

    const yScale = scaleLinear()
        .domain([
            Math.min(...(viewGoal ? enhancedRecords : records).map((d) => d.weight)) - 5,
            Math.max(...(viewGoal ? enhancedRecords : records).map((d) => d.weight)) + 5,
        ])
        .range([150, 0]);

    const lineGenerator = line()
        .x((d, index) => xScale(index))
        .y((d) => yScale(d.weight))
        .curve(curveCardinal.tension(0.9));

    return (
        <SafeAreaView className="bg-[#1a202c] flex-1 px-4">
            <View className="flex-row justify-center items-center">
                <Text className="text-white items-center text-lg font-bold">Track Goal</Text>
            </View>
            <Text className="text-green-400 text-xl font-bold my-4 text-center">
                You are doing well!
            </Text>
            {/* Status Cards */}
            <View className="flex-row justify-between mb-4">
                <View className="flex-1 mx-2 items-center p-4 rounded-lg bg-neutral-900">
                    <Text className="text-white text-sm">Current Weight</Text>
                    <Text className="text-yellow-400 text-lg font-bold">
                        {records?.length > 0 ? `${records[records.length - 1].weight} Kg` : 'N/A'}
                    </Text>
                </View>
                <View className="flex-1 mx-2 items-center p-4 rounded-lg bg-neutral-900">
                    <Text className="text-white text-sm">
                        {(() => {
                            if (records?.length > 0) {
                                const startWeight = records[0].weight;
                                const currentWeight = records[records.length - 1].weight;
                                const weightChange = currentWeight - startWeight;
                                if (weightChange < 0) return 'Lose Weight';
                                if (weightChange > 0) return 'Gain Weight';
                                return 'Maintain Weight';
                            }
                            return '';
                        })()}
                    </Text>
                    <Text className="text-white text-lg font-bold">
                        {records?.length > 0
                            ? `${Math.abs(records[records.length - 1].weight - records[0].weight)} Kg`
                            : '0 Kg'}
                    </Text>
                </View>
            </View>
            <View className="flex-row justify-center mb-4">
                <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${viewGoal ? 'bg-neutral-700' : 'bg-teal-400'}`}
                    onPress={() => setViewGoal(false)} // Show Actual graph
                >
                    <Text className="text-black">Actual</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${viewGoal ? 'bg-teal-400' : 'bg-neutral-700'} ml-2`}
                    onPress={() => setViewGoal(true)} // Show Goal graph
                >
                    <Text className="text-black">Goal</Text>
                </TouchableOpacity>
            </View>
            {/* Graph */}
            <View className="items-center mb-4 mx-2 p-4 bg-neutral-900 rounded-lg">
                <Svg height="200" width="300">
                    <Path
                        d={lineGenerator(viewGoal ? enhancedRecords : records)}  // Conditionally render graph
                        fill="none"
                        stroke={viewGoal ? "#00FFAA" : "#00FFAA"}
                        strokeWidth={5}
                    />
                    {(viewGoal ? enhancedRecords : records).map((point, index) => (
                        <React.Fragment key={`${point.weight}-${index}`}>
                            <Circle
                                cx={xScale(index)}
                                cy={yScale(point.weight)}
                                r={5}
                                fill="#FF5555"
                            />
                            <SvgText
                                x={xScale(index)}
                                y={yScale(point.weight) - 15}
                                fontSize={10}
                                fill="#C0C0C0"
                                textAnchor="middle"
                            >
                                {new Date(point.time).toLocaleDateString()}
                            </SvgText>
                        </React.Fragment>
                    ))}
                </Svg>
            </View>
             <View className="flex-row px-8 justify-between mb-4">
                {/* Display Start (Initial weight) */}
                {records.length > 0 && (
                    <View className="items-center">
                        <Text className="text-white text-sm">Start</Text>
                        <Text className="text-red-400 text-base font-bold">{`${records[0].weight} Kg`}</Text>
                    </View>
                )}

                {/* Display Goal weight */}
                {records.length > 0 && (
                    <View className="items-center">
                        <Text className="text-white text-sm">Goal</Text>
                        <Text className="text-green-400 text-base font-bold">{`${records[records.length - 1].goal_weight || 'N/A'} Kg`}</Text>
                    </View>
                )}
            </View>

            {/* Entries */}
            <View className="mt-4 px-4 flex-1">
             <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-base font-bold">Entries</Text>
                    <TouchableOpacity className="p-2 rounded-lg bg-neutral-700">
                        <Text className="text-teal-400 text-sm">+Create Collage</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={records}
                    keyExtractor={(item, index) => `${item._id}-${index}`}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center mb-4">
                            <Image
                                source={{ uri: 'https://via.placeholder.com/50' }}
                                className="w-12 h-12 rounded-lg mr-4"
                            />
                            <View>
                                <Text className="text-white text-base font-bold">{`${item.weight} Kg`}</Text>
                                <Text className="text-gray-400 text-sm">
                                    {new Date(item.time).toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default TrackGoalScreen;