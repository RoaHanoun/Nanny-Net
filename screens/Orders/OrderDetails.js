// OrderDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetails = ({ route }) => {
  const { title, date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Title: ${title}`}</Text>
      <Text style={styles.date}>{`Date: ${date}`}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff0ec', // Set the background color as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#c2274b',
  },
  date: {
    fontSize: 16,
    color: '#556b8d', // Set the text color as needed
  },
  // Add more styles as needed
});

export default OrderDetails;
