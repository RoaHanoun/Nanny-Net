import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OfferPending = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOfferOrders();
  }, []);

  const fetchOfferOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const response = await axios.get('http://176.119.254.188:8080/customer/offer/orders/pending', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

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
    return groupedOrders;
  };

  // Group orders
  const groupedOrders = groupOrdersByTime(orders);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <FontAwesome5 name="handshake" size={24} color="#c2274b" />
          <Text style={styles.headerText}>Offers Pending Orders</Text>
        </View>

        {/* Render grouped orders */}
        {Object.keys(groupedOrders).map((key, index) => (
          <View key={index} style={styles.orderGroup}>
            <Text style={styles.groupHeader}>Order {index+1}</Text>
            {groupedOrders[key].map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => handleOrderClick(order)}
              >
                <Text style={styles.orderInfo}>Order submiting Time: {order.orderSubmittedDate}</Text>
                <Text style={styles.orderInfo}>Babysitter: {order.employee?.user?.name}</Text>
                <Text style={styles.orderInfo}>Order Location: {order.orderLocation?.city}, {order.orderLocation?.streetData}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details</Text>
            {selectedOrder && (
              <>
                <Text style={styles.modalText}>Start Time: {selectedOrder.startTime}</Text>
                <Text style={styles.modalText}>End Time: {selectedOrder.endTime}</Text>
                <Text style={styles.modalText}>Order Location: {selectedOrder.orderLocation?.city}, {selectedOrder.orderLocation?.streetData}</Text>
                <Text style={styles.modalText}>Number Of Kids: {selectedOrder.numOfKids}</Text>
                <Text style={styles.modalText}>Details: {selectedOrder.describtion}</Text>
                <Text style={styles.modalText}>Babysitter: {selectedOrder.employee?.user?.name}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    marginBottom: 20,
    backgroundColor: '#fff0ec',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  groupHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: '#fff', // Lighter background for card
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  orderInfo: {
    fontSize: 16,
    color: '#556b8d',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    elevation: 5, // Added shadow for modal
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#c2274b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OfferPending;
