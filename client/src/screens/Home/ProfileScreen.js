import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MorningScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FDEB71', '#F8D800']}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, Chris</Text>
          <Text style={styles.dateText}>28 February, 2020</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activities today</Text>
          <Text style={styles.cardSubtitle}>Meditation and relaxation</Text>
          <Text style={styles.cardTime}>8:00 a.m.</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>What do you need today?</Text>
          <View style={styles.actionCard}>
            <Text style={styles.actionText}>Meditation Zen</Text>
            <Text style={styles.recommendText}>Recommended in Morning</Text>
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
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  cardTime: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 30,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionCard: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  recommendText: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
});

export default MorningScreen;
