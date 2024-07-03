import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const NewPassword = ({ navigation ,route}) => {
    const { Email, Code } = route.params;

  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  
  
  useEffect(() => {
  
  }, []);

  const handleChangePassword = async () => {
    let isError = false;

    const passwordRegex = /^(?=.*\d).{6,}$/;
    if (!NewPassword || !passwordRegex.test(NewPassword)) {
      setPasswordError('Password must be at least 8 characters and contain a number.');
      isError = true;
    } else {
      setPasswordError('');
    }
    if (isError) {
        Alert.alert('Error', 'Please correct the errors.');
        return;
      }
    try {
      const response = await axios.post(
        'http://176.119.254.188:8080/user/update_password',
        { email: Email, newPassword: NewPassword, confirmPassword: ConfirmPassword ,verCode: Code} 
      );
  
      if (response.status === 200) {
        Alert.alert('Success', response.data);
        setConfirmPassword('');
        setNewPassword('');
        navigation.navigate('Login');
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
   
      {/* <TextInput
        placeholder="New Password"
        value={NewPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      /> */}
        <TextInput
            style={[styles.input, passwordError && styles.errorBorder]}
            placeholder="New Password"
            secureTextEntry
            value={NewPassword}
            onChangeText={text => setNewPassword(text)}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TextInput
        placeholder="Confirm New Password"
        value={ConfirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default NewPassword;
