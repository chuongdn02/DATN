import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, Modal, TextInput, Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import { line, curveCardinal } from 'd3-shape';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchUserRecords } from '../../store/actions/authActions';

const TrackGoalScreen = ({ navigation }) => {
    const [viewGoal, setViewGoal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newWeight, setNewWeight] = useState('');
    const dispatch = useDispatch();
    const records = useSelector((state) => state.auth.records.records);
    const userId = useSelector((state) => state.auth.user.user.userId);
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

    const handleAddRecord = () => {
        if (!newWeight) return alert('Hãy nhập cân nặng mới!');

        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn cập nhật cân nặng mới không?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xác nhận",
                    onPress: async () => {
                        try {
                            const latestRecord = records[records.length - 1];
                            const newRecord = {
                                ...latestRecord,
                                weight: parseFloat(newWeight),
                                time: new Date().toISOString(),
                            };

                            // Lưu vào Redux (frontend)
                            dispatch({ type: 'ADD_RECORD', payload: newRecord });

                            // Lưu vào backend
                            const response = await fetch(
                                `http://localhost:3000/auth/users/${userId}/record`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(newRecord),
                                }
                            );

                            if (!response.ok) {
                                const errorData = await response.json();
                                alert(`Error: ${errorData.message}`);
                                return;
                            }

                            dispatch(fetchUserRecords(userId));
                        } catch (error) {
                            console.error('Error saving record:', error);
                            alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                        } finally {
                            // Đóng modal
                            setModalVisible(false);
                            setNewWeight('');
                        }
                    }
                }
            ]
        );
    };


    return (
        <SafeAreaView className="bg-[#1a202c] flex-1 px-4">
            <SafeAreaView className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => navigation.navigate('Root')} className="p-2">

                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">Tiến trình & mục tiêu</Text>
            </SafeAreaView>
            <Text className="text-green-400 text-xl font-bold mb-4 text-center">
                Bạn đang làm rất tốt!
            </Text>
            {/* Thẻ trạng thái */}
            <View className="flex-row justify-between mb-4">
                <View className="flex-1 mx-2 items-center p-4 rounded-lg bg-neutral-900">
                    <Text className="text-white text-sm">Cân nặng hiện tại</Text>
                    <Text className="text-yellow-400 text-lg font-bold">
                        {records?.length > 0 ? `${records[records.length - 1].weight} Kg` : 'Không xác định'}
                    </Text>
                </View>
                <View className="flex-1 mx-2 items-center p-4 rounded-lg bg-neutral-900">
                    <Text className="text-white text-sm">
                        {(() => {
                            if (records?.length > 0) {
                                const startWeight = records[0].weight;
                                const currentWeight = records[records.length - 1].weight;
                                const weightChange = currentWeight - startWeight;
                                if (weightChange < 0) { return 'Bạn đã giảm'; }
                                if (weightChange > 0) { return 'Bạn đã tăng'; }
                                return 'Duy trì cân nặng';
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
                    onPress={() => setViewGoal(false)} // Hiển thị đồ thị thực tế
                >
                    <Text className="text-black">Thực tế</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`px-4 py-2 rounded-lg ${viewGoal ? 'bg-teal-400' : 'bg-neutral-700'} ml-2`}
                    onPress={() => setViewGoal(true)} // Hiển thị đồ thị mục tiêu
                >
                    <Text className="text-black">Mục tiêu</Text>
                </TouchableOpacity>
            </View>
            {/* Biểu đồ */}
            <View className="items-center mb-4 mx-2 p-4 bg-neutral-900 rounded-lg">
                <Svg height="200" width="300">
                    <Path
                        d={lineGenerator(viewGoal ? enhancedRecords : records)}  // Hiển thị đồ thị tùy theo trạng thái
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
                                {point.weight}
                            </SvgText>
                        </React.Fragment>
                    ))}
                </Svg>
            </View>
            <View className="flex-row px-8 justify-between mb-4">
                {records.length > 0 && (
                    <View className="items-center">
                        <Text className="text-white text-sm">Bắt đầu</Text>
                        <Text className="text-red-400 text-base font-bold">{`${records[0].weight} Kg`}</Text>
                    </View>
                )}

                {records.length > 0 && (
                    <View className="items-center">
                        <Text className="text-white text-sm">Mục tiêu</Text>
                        <Text className="text-green-400 text-base font-bold">{`${records[records.length - 1].goal_weight || 'Không xác định'} Kg`}</Text>
                    </View>
                )}
            </View>

            {/* Bản ghi */}
            <View className="mt-4 px-4 flex-1">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-base font-bold">Các bản ghi cân nặng</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="p-2 rounded-lg bg-neutral-700"
                    >
                        <Text className="text-teal-400 text-sm">+Cập nhật</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={records.slice().reverse()}
                    keyExtractor={(item, index) => `${item._id}-${index}`}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center mb-4">
                            <Icon
                                name="monitor-weight" 
                                size={48} 
                                color="#FFD700" 
                                className="mr-4" 
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

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 justify-center items-center">
                        <View className="bg-white rounded-lg p-6 w-4/5">
                            <Text className="text-lg font-bold mb-4 text-center">
                                Cập nhật cân nặng
                            </Text>
                            <TextInput
                                className="border border-gray-300 rounded-md p-3 mb-4"
                                placeholder="Nhập cân nặng (kg)"
                                keyboardType="numeric"
                                value={newWeight}
                                onChangeText={setNewWeight}
                            />
                            <View className="flex-row justify-end">
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    className="px-4 py-2 rounded-md bg-gray-300 mr-2"
                                >
                                    <Text>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleAddRecord}
                                    className="px-4 py-2 rounded-md bg-teal-400"
                                >
                                    <Text className="text-white">Lưu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default TrackGoalScreen;
