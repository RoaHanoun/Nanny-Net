import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const PasswordCodeVer = ({ navigation, route }) => {
  const { Email } = route.params; 
  const [Code, setCode] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'http://176.119.254.188:8080/vercode',
        { email: Email, code: Code }
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data); 
        setCode(''); 
        navigation.navigate('NewPassword', {Email , Code}); 
      } else {
        Alert.alert(
          'Error',
          'An error occurred while verifying the code. Please try again later.'
        );
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert(
        'Error',
        'An error occurred while verifying the code. Please try again later.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Code"
        value={Code}
        onChangeText={setCode}
        style={styles.input}
      />
    
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Code</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff0ec',
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#c2274b',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  button: {
    width: '60%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#c2274b',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PasswordCodeVer;
