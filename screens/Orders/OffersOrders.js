import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OffersOrders = ({ navigation }) => {
  const [currentOffer, setCurrentOffer] = useState(null);

  useEffect(() => {
    fetchCurrentOffer();
  }, []);

  const fetchCurrentOffer = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');

      const response = await axios.get('http://176.119.254.188:8080/customer/offer/view/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentOffer(response.data);
    } catch (error) {
      console.error('Error fetching current offer:', error);
    }
  };

  return (
    <View style={styles.container}>
      {currentOffer && (
        <View style={styles.currentOfferBox}>
          <View style={styles.currentOfferTitleContainer}>
            <MaterialIcons name="calendar-today" size={24} color="#c2274b" style={{ marginRight: 10 }} />
            <Text style={styles.currentOfferTitle}>{currentOffer.offerType.description}</Text>
          </View>
          <Text style={styles.currentOfferInfo}>Cost: {currentOffer.price}</Text>
          <Text style={styles.currentOfferInfo}>Date Start: {currentOffer.dateStart}</Text>
          <Text style={styles.currentOfferInfo}>Date End: {currentOffer.dateEnd}</Text>
          <Text style={styles.currentOfferInfo}>Orders Left: {currentOffer.timesLeft}</Text>
        </View>
      )}

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <MaterialIcons name="today" size={24} color="#c2274b" />
          <Text style={styles.headerText}>Offers Orders Types</Text>
        </View>

        <TouchableOpacity 
          style={styles.orderCard} 
          onPress={() => navigation.navigate('OfferPending')}
        >
          <FontAwesome5 name="clock" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Pending Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.orderCard} 
          onPress={() => navigation.navigate('OfferAccepted')}
        >
          <FontAwesome5 name="handshake" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Accepted Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.orderCard} 
          onPress={() => navigation.navigate('OfferSubmitted')}
        >
          <FontAwesome5 name="box" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Submitted Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddOfferOrder')}
      >
        <Text style={styles.addButtonText}>Add Offer Order</Text>
      </TouchableOpacity>
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
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#c2274b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentOfferBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currentOfferTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentOfferTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  currentOfferInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default OffersOrders;
