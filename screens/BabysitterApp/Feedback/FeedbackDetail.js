import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FeedbackDetail = ({ route }) => {
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
      <Text style={styles.title}>Thank you for your effort </Text>
      <View style={styles.feedbackInfo}>
        <Text style={styles.label}>From: </Text>
        <Text style={styles.value}>{feedback.customer.user.name}</Text>
      </View>
      <View style={styles.feedbackInfo}>
        <Text style={styles.label}>Stars: </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderStars(feedback.stars)}
        </View>
      </View>
      <View style={styles.feedbackInfo}>
        <Text style={styles.label}>Comment: </Text>
        <Text style={styles.value}>{feedback.comment}</Text>
      </View>
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
    textAlign: 'center',
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
  },
});

export default FeedbackDetail;
