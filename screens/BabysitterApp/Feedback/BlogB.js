import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
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
    return feedbacks.map((feedback, index) => (
      <TouchableOpacity key={feedback.id} style={[styles.commentContainer, index === feedbacks.length - 1 && styles.lastCommentContainer]} onPress={() => handleViewFeedbackDetail(feedback)}>
        <View style={styles.commentHeader}>
          <Image source={{ uri: feedback.profileImage }} style={styles.profileImage} />
          <Text style={styles.parentName}>From: {feedback.customer.user.name}</Text>
        </View>
        <Text style={styles.commentText}>{feedback.comment}</Text>
        <Text style={styles.commentDate}>{feedback.feedbackSubmittedDate}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
       {/* Header image and sentence */}
       <Image
          source={require('../../../assets/blog.jpg')} 
          style={styles.headerImage}
          resizeMode="cover"
        />
      <Text style={styles.headerText}>Welcome to Our Blog</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
       

        {/* Feedbacks */}
        {renderFeedbacks()}
      </ScrollView>

      <FooterB navigation={navigation} />
    </KeyboardAvoidingView>
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
    color: "#c2274b",

  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  lastCommentContainer: {
    marginBottom: 100, // Adjust this value as needed to ensure last item is fully visible
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
    // color: "#c2274b",

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
