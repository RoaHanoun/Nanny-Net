import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for comment icon
import Footer from '../Footer/Footer'; // Import the Footer component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation

const Blog = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      // Retrieve the customer ID from AsyncStorage
      const customerId = await AsyncStorage.getItem('id');

      if (!customerId) {
        console.error('Customer ID not found in AsyncStorage');
        return;
      }

      // Fetch feedbacks from the API with the customer ID
      const response = await axios.post('http://176.119.254.188:8080/customer/feedback/search/customer', {
        customerId: customerId, // Pass the retrieved customer ID
      });

      // Set the feedbacks state
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleFeedbackDetails = (feedback) => {
    // Navigate to FeedbackDetails screen when a comment box is clicked
    navigation.navigate('FeedbackDetails', { feedback });
  };


  const renderFeedbacks = () => {
    return feedbacks.map((feedback, index) => (
      <TouchableOpacity key={index} onPress={() => handleFeedbackDetails(feedback)}>
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Image source={{ uri: feedback.profileImage }} style={styles.profileImage} />
            <Text style={styles.parentName}>To: {feedback.employee.user.name}</Text>
          </View>
          <Text style={styles.commentText}>{feedback.comment}</Text>
          <Text style={styles.commentDate}>Feedback Date: {feedback.feedbackSubmittedDate}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header image and sentence */}
      <Image
        source={require('../../assets/blog.jpg')} 
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>Welcome to Our Blog</Text>
      {/* Blog comments */}
      <ScrollView style={styles.commentsContainer}>
        {renderFeedbacks()}
      </ScrollView>
      <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  commentsContainer: {
    flex: 1,
    padding: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#c2274b',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  parentName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentText: {
    color: '#556b8d',
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  commentDate: {
    color: 'gray',
    marginBottom: 5,
  },
  createCommentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  createCommentText: {
    marginLeft: 10,
    color: '#c2274b',
    fontWeight: 'bold',
  },
});

export default Blog;
