import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const AddCaloScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');

  // Hàm mở camera
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Camera', 'User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Camera Error', response.errorMessage);
      } else {
        Alert.alert('Photo Captured', 'Your photo has been taken successfully!');
        console.log(response.assets[0]); // Xử lý ảnh tại đây
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Breakfast</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search food"
          placeholderTextColor="#A0AEC0"
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={openCamera}>
          <Text style={styles.barcodeIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'My Foods', 'Meals'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nội dung hiển thị */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.emptyText}>
          {selectedTab === 'All' ? 'No food found!' : `No items in ${selectedTab}`}
        </Text>
      </ScrollView>

      {/* Nút hành động */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.buttonText}>Create a Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAddButton}>
          <Text style={styles.buttonText}>Quick Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Các style như bạn đã định nghĩa
});

export default AddCaloScreen;
