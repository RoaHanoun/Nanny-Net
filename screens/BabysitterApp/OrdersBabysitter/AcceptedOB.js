import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AcceptedOB = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onScreenFocus = () => {
        fetchOrders(); // Refresh orders when the screen is focused
      };
      onScreenFocus();
    }, [])
  );

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const response = await axios.get('http://176.119.254.188:8080/provider/orders/accepted', {
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


  const navigateBackToOrders = () => {
    navigation.navigate('Orders');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'POP') {
        // Only navigate back to 'Orders' screen if the action is not 'POP'
        return;
      }
      e.preventDefault(); // Prevent default action
      navigateBackToOrders(); // Navigate to 'Orders' screen
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="box-open" size={24} color="#c2274b" />
        <Text style={styles.headerText}>Accepted Orders</Text>
      </View>

      {orders.map((order) => (
        <TouchableOpacity
          key={order.id}
          style={styles.orderCard}
          onPress={() => navigateToOrderDetails(order)}
        >
          <Text style={styles.orderInfo}>Price: {order.price}$</Text>
          <Text style={styles.orderInfo}>Babysitter Name: {order.employee.user.name}</Text>
          <Text style={styles.orderInfo}>Order Date: {order.orderDate}</Text>
          <Text style={styles.orderInfo}>Order Location: {order.orderLocation.city}</Text>
          
         
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
  feedbackButton: {
    backgroundColor: '#c2274b',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AcceptedOB;
