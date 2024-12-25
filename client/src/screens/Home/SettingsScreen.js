import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the MaterialCommunityIcons

const MealCard = ({ iconName, mealName, calories, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#1c1c2c',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
          }}
        >
          <Icon name={iconName} size={30} color="#FFD700" /> {/* Golden icon color */}
        </View>
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{mealName}</Text>
          {calories && (
            <Text style={{ color: '#cccccc', fontSize: 14, marginTop: 5 }}>{calories} kcal</Text>
          )}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#2ecc71',
          borderRadius: 50,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
      <MealCard
        iconName="toast" // Icon for breakfast (toast icon from MaterialCommunityIcons)
        mealName="Add Breakfast"
        calories="200.0"
        onPress={() => console.log('Breakfast')}
      />
      <MealCard
        iconName="food" // Icon for lunch (plate icon)
        mealName="Add Lunch"
        onPress={() => console.log('Lunch')}
      />
      <MealCard
        iconName="pizza" // Icon for snack (pizza slice icon)
        mealName="Add Snack"
        onPress={() => console.log('Snack')}
      />
    </View>
  );
};

export default App;
