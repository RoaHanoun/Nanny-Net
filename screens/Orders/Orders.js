// Orders.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './Stayles'; // Import styles from the separate file
import Footer from '../Footer/Footer'; // Import the Footer component
import Nav from '../Navbar/Nav'; // Import the Navbar component
import OrderDetails from './OrderDetails';

const Orders = () => {
  const navigation = useNavigation();

  // Dummy data for past and current requests
  const pastRequests = [
    { id: '1', title: 'Past Request 1', date: '2023-01-01' },
    { id: '2', title: 'Past Request 2', date: '2023-02-15' },
    // Add more past requests as needed
  ];

  const currentRequests = [
    { id: '3', title: 'Current Request 1', date: '2024-01-17' },
    { id: '4', title: 'Current Request 2', date: '2024-02-28' },
    // Add more current requests as needed
  ];

  // Combine past and current requests into one array
  const allRequests = [...pastRequests, ...currentRequests];

  return (
    <View style={Styles.container}>
      {/* <Nav /> */}

      {/* List of past and current requests */}
      <FlatList
        data={allRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={Styles.requestBox}
            onPress={() => {
              // Navigate to OrderDetails and pass order information as params
              navigation.navigate('OrderDetails', {
                title: item.title,
                date: item.date,
              });
            }}
          >
            <Text style={Styles.boldPinkText}>{item.title}</Text>
            <Text>{`Date: ${item.date}`}</Text>
          </TouchableOpacity>
        )}
      />

      <Footer navigation={navigation} />
    </View>
  );
};

export default Orders;
