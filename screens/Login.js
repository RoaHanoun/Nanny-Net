import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    let isError = false;

    // Validation for username (email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !emailRegex.test(username)) {
      setUsernameError('Please enter a valid email.');
      isError = true;
    } else {
      setUsernameError('');
    }

    // Validation for password
    const passwordRegex = /^(?=.*\d).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
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
      const response = await axios.post('http://176.119.254.188:8080/login', {
        email: username,
        password: password,
      });

      const { jwt, id, role } = response.data;

      // Save token and user ID to AsyncStorage for future use
      await AsyncStorage.setItem('jwt', jwt);
      await AsyncStorage.setItem('id', id);

      // Clear input fields
      setUsername('');
      setPassword('');

      // Navigate based on the role
      if (role === 'c') {
        navigation.navigate('Babysitter');
      } else if (role === 'e') {
        navigation.navigate('BabysitterB');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Invalid username or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back!</Text>
          <TextInput
            style={[styles.input, usernameError && styles.errorBorder]}
            placeholder="Email"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
          <TextInput
            style={[styles.input, passwordError && styles.errorBorder]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

           <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderQRCode', 4567)}>
            <Text style={styles.buttonText}>QR</Text>
          </TouchableOpacity> 

          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupButtonContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Choose')}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff0ec",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  form: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#556b8d', 
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#556b8d',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#fff0ec', 
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c2274b',
    alignItems: 'center',
  },
  buttonText: {
    color: '#c2274b', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgetPassword: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  signupButtonContainer: {
    position: 'relative', 
    bottom: -50,
    width: '100%',
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderColor: "#c2274b",
    borderWidth: 1,
    width: '75%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#c2274b',
    fontSize: 15,
  },
  errorBorder: {
    borderColor: 'red',
  },
});

export default Login;
