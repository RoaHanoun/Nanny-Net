import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentOB = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders(); // Refresh orders when the screen is focused
    }, [])
  );

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const response = await axios.get('http://176.119.254.188:8080/provider/orders/submitted', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const navigateToOrderDetails = (order) => {
    navigation.navigate('OrderDetailsB', { order });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Check if the action type is 'POP'
      if (e.data.action.type === 'POP') {
        // Allow default behavior for 'POP' action
        return;
      }
      // Prevent the default behavior of going back for other actions
      e.preventDefault();
      // Perform custom action to navigate back to 'OrdersB' screen
      navigation.navigate('OrdersB');
    });
  
    return unsubscribe;
  }, [navigation]);
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="box-open" size={24} color="#c2274b" />
        <Text style={styles.headerText}>Current Orders</Text>
      </View>

      {orders.map((order) => (
        <TouchableOpacity
          key={order.id}
          style={styles.orderCard}
          onPress={() => navigateToOrderDetails(order)}
        >
          <Text style={styles.orderInfo}>Order ID: {order.id}</Text>
          <Text style={styles.orderInfo}>Price: {order.price}$</Text>
          <Text style={styles.orderInfo}>Num of Kids: {order.numOfKids}</Text>
          <Text style={styles.orderInfo}>Order Date: {order.orderDate}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    marginBottom: 7,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c2274b',
    marginLeft: 10,
  },
  orderCard: {
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
  orderInfo: {
    fontSize: 16,
    color: '#556b8d',
    marginBottom: 5,
  },
});

export default CurrentOB;
