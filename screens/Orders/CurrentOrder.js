import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CurrentOrder = ({ navigation }) => {
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
      const response = await axios.get('http://176.119.254.188:8080/customer/orders/submitted', {
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

  const navigateToFeedback = (babysitterId) => {
    navigation.navigate('FeedbackScreen', { babysitterId });
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

  // Function to group orders by a key (e.g., by babysitter name)
  const groupOrdersByKey = (orders, key) => {
    const groupedOrders = {};

    orders.forEach((order) => {
      const keyValue = order[key];
      if (!groupedOrders[keyValue]) {
        groupedOrders[keyValue] = [];
      }
      groupedOrders[keyValue].push(order);
    });

    return Object.entries(groupedOrders);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="box-open" size={24} color="#c2274b" />
        <Text style={styles.headerText}>Current Orders</Text>
      </View>

      {groupOrdersByKey(orders, 'employee.user.name').map(([key, ordersForKey]) => (
        <TouchableOpacity
          key={key}
          style={styles.orderGroup}
          onPress={() => navigateToOrderDetails(ordersForKey)}
        >
          <Text style={styles.babysitterName}>Babysitter Name: {key}</Text>
          <View style={styles.ordersContainer}>
            {ordersForKey.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => navigateToOrderDetails(order)}
              >
                <Text style={styles.orderInfo}>Order ID: {order.id}</Text>
                <Text style={styles.orderInfo}>Price: {order.price}$</Text>
                <Text style={styles.orderInfo}>Order Date: {order.orderDate}</Text>
                <Text style={styles.orderInfo}>Order Location: {order.orderLocation.city}</Text>
                
                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => navigateToFeedback(order.employee.user.id)}
                >
                  <Text style={styles.buttonText}>Submit Feedback</Text>
                </TouchableOpacity>
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
  babysitterName: {
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

export default CurrentOrder;
