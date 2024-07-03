import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BindingOrder = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders(); // Refresh orders when the screen is focused
    }, [])
  );

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');

      const response = await axios.get('http://176.119.254.188:8080/customer/orders/pending', {
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
    navigation.navigate('OrderDetail', { order });
  };

  const navigateBackToOrders = () => {
    navigation.navigate('Orders');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Check if the current screen is being removed
      if (e.data.action.type === 'POP' && navigation.isFocused()) {
        e.preventDefault(); // Prevent default action
        navigateBackToOrders(); // Navigate to 'Orders' screen
      }
    });
  
    return unsubscribe;
  }, [navigation, navigateBackToOrders]);

  // Function to group orders by start time and end time
  const groupOrdersByTime = (orders) => {
    const groupedOrders = {};

    orders.forEach((order) => {
      const key = `${order.startTime}-${order.endTime}`;
      if (!groupedOrders[key]) {
        groupedOrders[key] = [];
      }
      groupedOrders[key].push(order);
    });

    return Object.entries(groupedOrders);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="handshake" size={24} color="#c2274b" />
        <Text style={styles.headerText}>Pending Orders</Text>
      </View>

      {groupOrdersByTime(orders).map(([timeGroup, ordersInGroup]) => (
        <TouchableOpacity
          key={timeGroup}
          style={styles.orderGroup}
          onPress={() => navigateToOrderDetails(ordersInGroup)}
        >
          <Text style={styles.timeGroupText}>Time: {timeGroup}</Text>
          <View style={styles.ordersContainer}>
            {ordersInGroup.map((order) => (
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
          </View>
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
  orderGroup: {
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
  timeGroupText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#556b8d',
    marginBottom: 10,
  },
  ordersContainer: {
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
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

export default BindingOrder;
