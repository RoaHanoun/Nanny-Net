import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PastOrderDetailB = ({ navigation, route }) => {
  const { order } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Details</Text>
    
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Order Date:</Text> {order.orderDate}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Price:</Text> {order.price}$
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Number of Kids:</Text> {order.numOfKids}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Order Submitted Date:</Text> {order.orderSubmittedDate}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Start Time:</Text> {order.startTime}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>End Time:</Text> {order.endTime}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Description:</Text> {order.describtion}
        </Text>
        {order.orderLocation && (
          <View style={styles.detailText}>
            <Text style={styles.label}>Order Location:</Text>
            <Text style={styles.sublabel}>City: {order.orderLocation.city}</Text>
            <Text style={styles.sublabel}>Street Data: {order.orderLocation.streetData}</Text>
            <Text style={styles.sublabel}>Description: {order.orderLocation.extraDescription}</Text>
          </View>
        )}
        <Text style={styles.detailText}>
          <Text style={styles.label}>Babysitter:</Text> {order.employee?.user?.name}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c2274b',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff0ec',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sublabel: {
    color: '#c2274b',
    marginBottom: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderColor: '#c2274b',
    borderWidth: 0.5,
  },
  label: {
    fontWeight: 'bold',
    color: '#556b8d',
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: '#ff7043', // Orange color for cancel button
    marginRight: 10,
  },
  button: {
    backgroundColor: '#c2274b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PastOrderDetailB;
