import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SummaryScreen = ({ navigation, route }) => {
  // Ensure record exists in params
  const { record } = route.params || {};

  if (!record) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.title}>Age: {record.age}</Text>
      <Text style={styles.title}>Gender: {record.gender}</Text>
      <Text style={styles.title}>Height: {record.height}</Text>
      <Text style={styles.title}>Weight: {record.weight}</Text>
      <Text style={styles.title}>Goal: {record.goal}</Text>
      <Text style={styles.title}>Goal: {record.goal}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SummaryScreen;
