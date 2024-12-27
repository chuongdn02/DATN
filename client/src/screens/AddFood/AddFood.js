import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderScrollView from './component/renderScrollView';
import { getAllFood } from '../../store/actions/authActions';

const AddFood = ({ navigation, route }) => {
    const { value, date } = route.params;
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(0);
    const [collapsedSections, setCollapsedSections] = useState({});
    const foods = useSelector((state) => state.foods.foods);
    const userId = useSelector((state) => state.auth.user.user.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(getAllFood(userId));
        }
    }, [dispatch, userId]);

    const yourFoods = useSelector((state) => state.auth.foods.yourFoods);

    useEffect(() => {
        if (value === 'breakfast') {
            setTitle('Bữa Sáng');
        } else if (value === 'lunch') {
            setTitle('Bữa Trưa');
        } else if (value === 'dinner') {
            setTitle('Bữa Tối');
        } else if (value === 'snack') {
            setTitle('Bữa Phụ');
        } else {
            setTitle('');
        }
    }, [value]);

    const toggleCollapse = (type) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };
    
    return (
        <View className="bg-[#1a202c] flex-1">
            <View className="flex-row items-center mb-4 mt-14">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <Icon name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 right-6 text-center">{title}</Text>
            </View>
            <View className="flex-row">
                <TextInput
                    className="p-3 bg-gray-100 text-gray-700 w-[77%] rounded-lg mx-4 mb-3"
                    value={search}
                    onChangeText={setSearch}
                    placeholder="🔍 Tìm món ăn"
                />
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/images/qrcode.png')}
                        className="w-10 h-10 bg-white"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-row ml-3">
                {['Tất cả', 'Món của tôi', 'Thực đơn của tôi'].map((option, index) => (
                    <Text
                        key={index}
                        onPress={() => setSelected(index)}
                        className={`p-2 mx-1 mt-2 rounded-full font-bold text-white border-[1px] border-white ${selected === index ? 'bg-blue-500' : 'bg-transparent'
                            } text-center`}
                    >
                        {option}
                    </Text>
                ))}
            </View>

            <RenderScrollView
                navigation={navigation}
                selected={selected}
                collapsedSections={collapsedSections}
                foods={foods}
                yourFoods={yourFoods}
                toggleCollapse={toggleCollapse}
                search={search}
                value={value}
                date={date}
            />

            <View className="absolute bottom-16 right-0 space-y-2">
                <TouchableOpacity
                    onPress={() => navigation.navigate('CrFood', { title: 'Tạo món ăn' })}
                    className="bg-green-400 rounded-l-[12px] p-3 justify-center items-center"
                >
                    <Text className="font-bold text-lg">Tạo một món</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('QAdd', {
                        title: 'Thêm nhanh',
                        type: value,
                        date: date
                    })}
                    className="rounded-l-[12px] p-3 justify-center items-center bg-[#1a202c] shadow-custom"
                >
                    <Text className="font-bold text-lg text-white">Thêm nhanh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddFood;
