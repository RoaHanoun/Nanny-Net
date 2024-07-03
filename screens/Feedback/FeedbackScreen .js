import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StarRating = ({ rating, setRating }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Icon
            name={star <= rating ? 'star' : 'star-o'}
            size={32}
            color="#c2274b"
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const FeedbackScreen = ({ navigation , route}) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const { babysitterId } = route.params;

  const submitFeedback = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const response = await axios.post(
        'http://176.119.254.188:8080/customer/feedback/submit',
        {
          employeeId: babysitterId,
          stars: rating,
          comment: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Feedback submitted:', response.data);

      setFeedback('');
      setRating(0);

      // Optionally, navigate back or show a success message
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>We appreciate your feedback.</Text>
      <Text style={styles.subHeader}>
        We are always looking for ways to improve your experience.
        Please take a moment to evaluate and tell us what you think.
      </Text>

      <StarRating rating={rating} setRating={setRating} />

      <TextInput
        style={styles.input}
        placeholder="What can we do to improve your experience?"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline={true} // Allow multiline input
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.buttonText}>Submit My Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0ec', // Changed background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center align the header text
    color: '#c2274b', // Updated text color
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center', // Center align the subheader text
    color: '#556b8d', // Updated text color
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    height: 100, // Enlarged input box height
    width: '100%', // Take full width
    borderColor: '#c2274b', // Updated border color
    borderWidth: 1,
    marginBottom: 20,
    color: '#556b8d', // Updated text color
    paddingHorizontal: 10, // Horizontal padding
    borderRadius: 8, // Rounded corners
  },
  submitButton: {
    backgroundColor: '#c2274b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
