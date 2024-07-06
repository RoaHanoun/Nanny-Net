import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure you have this package installed
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BabysitterFeedback2 = ({ route, navigation }) => {
  const { babysitterId } = route.params;
  const [feedbackData, setFeedbackData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndFeedback = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (!id) {
          console.error('User ID not found.');
          return;
        }
        setUserId(id);

        const response = await axios.post('http://176.119.254.188:8080/customer/feedback/search/employee', {
          employeeId: babysitterId,
        });

        if (response && response.data) {
          const allFeedback = response.data;
          // Filter feedback for the current user
          const userFeedback = allFeedback.filter(item => item.customer?.user?.id === parseInt(id));
          setFeedbackData(userFeedback);
        } else {
          console.log('No data returned from API');
          setFeedbackData([]);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
        Alert.alert('Error', 'Failed to fetch feedback. Please try again later.');
      }
    };

    fetchUserIdAndFeedback();
  }, [babysitterId]);

  const renderItem = ({ item }) => (
    <View style={styles.feedbackCard}>
      <View style={styles.feedbackHeader}>
        <Image
          source={require('../../assets/Profile.jpg')}
          style={styles.feedbackProfileImage}
          resizeMode="cover"
        />
        <View style={styles.feedbackInfo}>
          <Text style={styles.feedbackName}>{item.customer?.user?.name}</Text>
          <View style={styles.starsContainer}>
            {[...Array(Math.floor(item.stars || 0))].map((_, index) => (
              <FontAwesome key={index} name="star" size={20} color="#c2274b" style={{ marginRight: 5 }} />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.feedbackText}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedbackData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  feedbackCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  feedbackInfo: {
    marginLeft: 10,
  },
  feedbackName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#556b8d',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  feedbackText: {
    fontSize: 14,
    color: '#556b8d',
  },
  backButton: {
    backgroundColor: '#c2274b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default BabysitterFeedback2;
