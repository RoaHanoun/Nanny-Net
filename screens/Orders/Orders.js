import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Footer from '../Footer/Footer'; // Import the Footer component

const Orders = () => {
  const navigation = useNavigation();

 
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
      <View style={styles.orderCard} onTouchEnd={() => navigation.navigate('BindingOrder')}>
          <FontAwesome5 name="clock" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Pending Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </View>
        
        <View style={styles.orderCard} onTouchEnd={() => navigation.navigate('AcceptedOrders')}>
          <FontAwesome5 name="handshake" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Accepted Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </View>

        <View style={styles.orderCard} onTouchEnd={() => navigation.navigate('CurrentOrder')}>
          <FontAwesome5 name="box-open" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Current Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </View>


        <View style={styles.orderCard} onTouchEnd={() =>navigation.navigate('PastOrders')}>
          <MaterialIcons name="history" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Past Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </View>

        <View style={styles.orderCard} onTouchEnd={() =>  navigation.navigate('OffersOrders')}>
          <MaterialIcons name="today" size={24} color="#c2274b" />
          <Text style={styles.orderText}>Offers Orders</Text>
          <MaterialIcons name="navigate-next" size={24} color="#c2274b" />
        </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0ec',
  },
  scrollView: {
    flex: 1,
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
});

export default Orders;
