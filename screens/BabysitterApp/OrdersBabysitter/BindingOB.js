import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BindingOB = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders(); // Refresh orders when the screen is focused
    }, [])
  );

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');

      const response = await axios.get('http://176.119.254.188:8080/provider/orders/pending', {
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
    navigation.navigate('OrderDetailB', { order });
  };

  const navigateBackToOrders = () => {
    navigation.navigate('OrdersB');
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

  // Function to group orders by date
  const groupOrdersByDate = (orders) => {
    const groupedOrders = {};

    orders.forEach((order) => {
      const date = new Date(order.orderDate).toDateString(); // Grouping by date string
      if (!groupedOrders[date]) {
        groupedOrders[date] = [];
      }
      groupedOrders[date].push(order);
    });

    return Object.entries(groupedOrders);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="handshake" size={24} color="#c2274b" />
        <Text style={styles.headerText}>Pending Orders</Text>
      </View>

      {groupOrdersByDate(orders).map(([dateGroup, ordersInGroup]) => (
        <View key={dateGroup} style={styles.orderGroup}>
          <Text style={styles.dateGroupText}>{dateGroup}</Text>
          <View style={styles.ordersContainer}>
            {ordersInGroup.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => navigateToOrderDetails(order)}
              >
                <Text style={styles.orderInfo}>Order ID: {order.id}</Text>
                <Text style={styles.orderInfo}>Payment: {order.price}$</Text>
                <Text style={styles.orderInfo}>Num of Kids: {order.numOfKids}</Text>
                <Text style={styles.orderInfo}>Order Date: {order.orderDate}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  dateGroupText: {
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

export default BindingOB;
