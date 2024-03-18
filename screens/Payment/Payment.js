// Payment.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Payment = ({ route, navigation }) => {
  // Assume you are passing the total salary from the previous screen
  const { totalSalary } = route.params;

  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');

  const handleMakeRequest = () => {
    // Implement logic for making a payment request
    // You can use the state values (cardNumber, nameOnCard, expiryDate, cvc) and totalSalary
    console.log('Payment Request:', {
      totalSalary,
      cardNumber,
      nameOnCard,
      expiryDate,
      cvc,
    });
  
    // After making the payment request, navigate to the confirmation screen
    navigation.navigate('Conformation', {
      paymentDetails: {
        totalSalary,
        cardNumber,
        nameOnCard,
        expiryDate,
        cvc,
      },
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Salary: ${totalSalary}</Text>

      <Text style={styles.label}>Card Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCardNumber(text)}
        value={cardNumber}
        placeholder="Enter card number"
      />

      <Text style={styles.label}>Name on Card:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNameOnCard(text)}
        value={nameOnCard}
        placeholder="Enter name on card"
      />

      <Text style={styles.label}>Expiry Date:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setExpiryDate(text)}
        value={expiryDate}
        placeholder="MM/YYYY"
      />

      <Text style={styles.label}>CVC:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCVC(text)}
        value={cvc}
        placeholder="Enter CVC"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleMakeRequest}>
        <Text style={styles.buttonText}>Pay </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0ec',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:  '#556b8d',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color:  '#556b8d',
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderColor: '#556b8d',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 30,
    backgroundColor: '#c2274b',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
