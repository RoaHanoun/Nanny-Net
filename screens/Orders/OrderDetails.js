import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderDetails = ({ navigation, route }) => {
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
      const response = await axios.post(`http://176.119.254.188:8080/customer/order/cancel`,data, {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      }); 
      console.log(data);

      // Check the response status
      if (response.status === 200) {
        console.log('Order Cancled successfully:', response.data);
        // If needed, navigate to another screen
        navigation.navigate('CurrentOrder');
      } else {
        console.error('Error cancling order. Status:', response.status);
      }
    } catch (error) {
      console.error('Error cancling order:', error);
      console.error('Error cancling order. Status:', response.status);

    }
  };
  const handlePayment = () => {
    console.log(order.id);
    navigation.navigate('Payment', { totalSalary: order.price, orderId: order.id });
  };

  return (
    <View style={styles.container}>
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
        {/* <Text style={styles.detailText}>
          <Text style={styles.label}>Order Status:</Text> {order.orderStatus}
        </Text> */}
        {order.orderLocation && (
          <Text style={styles.detailText}>
            <Text style={styles.label}>Location:</Text> {order.orderLocation.city}, {order.orderLocation.streetData}
          </Text>
        )}
          <Text style={styles.detailText}>
          <Text style={styles.label}>Babysitter:</Text> {order.employee?.user?.name}
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancle}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handlePayment}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    borderWidth:0.5,
  },
  label: {
    fontWeight: 'bold',
    color: '#556b8d',

    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ff7043', // Orange color for cancel button
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#c2274b', // Red color for submit button
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
