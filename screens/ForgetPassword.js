import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ForgetPassword = ({ navigation ,route}) => {

  const [Email, setEmail] = useState('');
  
  
  useEffect(() => {
  
  }, []);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'http://176.119.254.188:8080/user/forgot-password',
        { email: Email } // Send Email as an object property
      );
  
      if (response.status === 200) {
        Alert.alert('Success', response.data);
        setEmail('');
        navigation.navigate('PasswordCodeVer',{Email});
      } else {
        Alert.alert(
          'Error',
          'An error occurred while changing your password. Please try again later.'
        );
      }
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert(
        'Error',
        'An error occurred while changing your password. Please try again later.'
      );
    }
  };
  



  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
        // secureTextEntry
        style={styles.input}
      />
      {/* <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      /> */}
      {/* <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      /> */}
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
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

export default ForgetPassword;
