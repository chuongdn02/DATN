import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NightScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Text style={styles.greetingText}>Good night</Text>
          <Text style={styles.dateText}>28 February, 2020</Text>
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Meditation Zen</Text>
          {/* Add Toggle Switch here */}
        </View>
        <View style={styles.content}>
          <Text style={styles.programmingText}>Programming</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Meditation Zen</Text>
            <Text style={styles.activitySubtitle}>In progress</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Bedtime</Text>
            <Text style={styles.activitySubtitle}>To do</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  toggleText: {
    fontSize: 16,
    color: '#fff',
  },
  content: {
    marginTop: 30,
  },
  programmingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#3a3a3c',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
});

export default NightScreen;
