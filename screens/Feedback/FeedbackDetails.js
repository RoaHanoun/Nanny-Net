import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FeedbackDetails = ({ route }) => {
  const { feedback } = route.params;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < rating ? 'star' : 'star-o'}
          size={24}
          color="#FFD700"
          style={{ marginRight: 5 }}
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thank You For Your Comment</Text>
      <View style={styles.card}>
        <View style={styles.feedbackInfo}>
          <Text style={styles.label}>To Babysitter :</Text>
          <Text style={styles.value}>{feedback.employee.user.name}</Text>
        </View>
        <View style={styles.feedbackInfo}>
          <Text style={styles.label}>Stars :</Text>
          <View style={styles.starsContainer}>
            {renderStars(feedback.stars)}
          </View>
        </View>
        <View style={styles.feedbackInfo}>
          <Text style={styles.label}>Comment :</Text>
          <Text style={styles.comment}>{feedback.comment}</Text>
        </View>
        <View style={styles.feedbackInfo}>
          <Text style={styles.label}>Feedback Date :</Text>
          <Text style={styles.value}>{feedback.feedbackSubmittedDate}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  feedbackInfo: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#556b8d',
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    color: '#333',
    fontSize: 16,
    marginLeft: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    color: '#555',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default FeedbackDetails;
