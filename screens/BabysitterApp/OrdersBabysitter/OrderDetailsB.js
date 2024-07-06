import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderDetailsB = ({ navigation, route }) => {
  const { order } = route.params;
  const handleCancle = async () => {
    try {
      // Retrieve the JWT token from AsyncStorage
      const jwt = await AsyncStorage.getItem('jwt');
      console.log(order.id);

      // Check if the token exists
      if (!jwt) {
        console.error('Token not found in AsyncStorage');
        return;
      }
      const data ={
        orderId: order.id.toString(),
      }
      const response = await axios.post(`http://176.119.254.188:8080/provider/order/cancel`,data, {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      }); 
      console.log(data);

      // Check the response status
      if (response.status === 200) {
        console.log('Order Cancled successfully:', response.data);
        // If needed, navigate to another screen
        navigation.replace('CurrentOB');
      } else {
        console.error('Error cancling order. Status:', response.status);
      }
    } catch (error) {
      console.error('Error cancling order:', error);
      console.error('Error cancling order. Status:', response.status);

    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Order Details</Text>
      
        <View style={styles.detailsContainer}>
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
            <Text style={styles.label}>Order Date:</Text> {order.orderDate}
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
          {order.customer && (
            <View style={styles.detailText}>
              <Text style={styles.label}>Customer Info:</Text>
              <Text style={styles.sublabel}>Name: {order.customer.user.name}</Text>
              <Text style={styles.sublabel}>Phone Number: {order.customer.user.telNumber}</Text>
              {/* <Text style={styles.sublabel}>Gender: {order.customer.user.gender}</Text> */}
              <Text style={styles.sublabel}>Location: {order.customer.location.city}, {order.customer.location.streetData}</Text>
            </View>
          )}
          {order.orderLocation && (
            <View style={styles.detailText}>
              <Text style={styles.label}>Order Location:</Text>
              <Text style={styles.sublabel}>City: {order.orderLocation.city}</Text>
              <Text style={styles.sublabel}>Street Data: {order.orderLocation.streetData}</Text>
              <Text style={styles.sublabel}>Description: {order.orderLocation.extraDescription}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleCancle}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity> 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
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
  sublabel: {
    color: '#c2274b',
    marginBottom: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,

  },
  button: {
    backgroundColor: '#ff7043', 
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

export default OrderDetailsB;
