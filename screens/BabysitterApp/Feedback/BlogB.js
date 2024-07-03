import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterB from '../../Footer/FooterB'; // Import the Footer component

const BlogB = () => {
  const navigation = useNavigation();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await axios.get('http://176.119.254.188:8080/provider/feedback/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleViewFeedbackDetail = (feedback) => {
    navigation.navigate('FeedbackDetail', { feedback });
  };

  const renderFeedbacks = () => {
    return feedbacks.map((feedback) => (
      <TouchableOpacity key={feedback.id} style={styles.commentContainer} onPress={() => handleViewFeedbackDetail(feedback)}>
        <View style={styles.commentHeader}>
          <Image source={feedback.profileImage} style={styles.profileImage} />
          <Text style={styles.parentName}>From: {feedback.customer.user.name}</Text>
        </View>
        <Text style={styles.commentText}>{feedback.comment}</Text>
        <Text style={styles.commentDate}>{feedback.feedbackSubmittedDate}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header image and sentence */}
      <Image
        source={require('../../../assets/blog.jpg')} 
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>Welcome to Our Blog</Text>

      {/* Feedbacks */}
      <ScrollView style={styles.commentsContainer}>
        {renderFeedbacks()}
      </ScrollView>
      <FooterB navigation={navigation} />

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
});

export default BlogB;
