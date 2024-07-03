import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({ route, navigation }) => {
  const { totalSalary, orderId } = route.params;
  // console.log(orderId);
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryMonth, setExpiryMonth] = useState(null);
  const [expiryYear, setExpiryYear] = useState(null);
  const [cvc, setCVC] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if any field is empty and disable the button accordingly
    if (cardNumber && nameOnCard && expiryMonth && expiryYear && cvc) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [cardNumber, nameOnCard, expiryMonth, expiryYear, cvc]);

  const handleMakeRequest = async () => {
    try {
      // Retrieve the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('jwt');
      
      // Check if the token exists
      if (!token) {
        console.error('Token not found in AsyncStorage');
        return;
      }

      // Send a POST request to the API with the order ID and JWT token in the headers
      const response = await axios.post(
        'http://176.119.254.188:8080/customer/order/submit',
        { orderId: orderId.toString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // If the request is successful, navigate to the appropriate screen
      if (response.status === 200) {
        console.log('Order submitted successfully:', response.data);
        navigation.navigate('ConformationPayment');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const validateCardNumber = (cardNum) => {
    return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNum);
  };

  const validateCardholderName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const validateExpiryDate = (month, year) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return false;
    }

    return true;
  };

  const validateCVC = (cvcNum) => {
    return /^\d{3}$/.test(cvcNum);
  };

  // Define months and years array
  const months = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

  const years = [
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Salary: ${totalSalary}</Text>

      <Text style={styles.label}>Card Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCardNumber(text.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1-').slice(0, 19))}
        value={cardNumber}
        placeholder="Enter card number"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Name on Card:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNameOnCard(text)}
        value={nameOnCard}
        placeholder="Enter name on card"
      />

      <Text style={styles.label}>Expiry Date:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Month', value: null }}
        onValueChange={(value) => setExpiryMonth(value)}
        items={months}
        style={pickerSelectStyles}
        value={expiryMonth}
      />
      <RNPickerSelect
        placeholder={{ label: 'Year', value: null }}
        onValueChange={(value) => setExpiryYear(value)}
        items={years}
        style={pickerSelectStyles}
        value={expiryYear}
      />

      <Text style={styles.label}>CVC:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCVC(text.replace(/[^\d]/g, '').slice(0, 3))}
        value={cvc}
        placeholder="Enter CVC"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handleMakeRequest}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Pay</Text>
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
    color: '#556b8d',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#556b8d',
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
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 40,
    borderColor: '#556b8d',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'white',
  },
  expiryContainer: {
    flexDirection: 'row',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
});
