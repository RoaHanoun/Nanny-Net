import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
          color="#c2274b"
          style={{ marginRight: 5 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You For Your Comment</Text>
      <View style={styles.feedbackInfo}>
        <Text style={styles.label}>To Babysitter : </Text>
        <Text style={styles.value}>{feedback.employee.user.name}</Text>
      </View>
      <View style={styles.feedbackInfo}>
        <Text style={styles.label}>Stars : </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderStars(feedback.stars)}
        </View>
      </View>

        <Text style={styles.label}>Comment : </Text>
        <Text style={styles.comment}>{feedback.comment}</Text>
   

        <Text style={styles.label}>Feddback Date :</Text>
        <Text style={styles.value}>{feedback.feedbackSubmittedDate}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#556b8d',
    marginBottom: 30,
  },
  feedbackInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#556b8d',
    fontSize: 18,
  },
  value: {
    color: 'gray',
    fontSize: 20,
    // fontWeight: 'bold',
  },
  comment: {
    color: 'gray',
    fontSize: 20,
    // fontWeight: 'bold',
    marginLeft: 30,
  },
});

export default FeedbackDetails;
