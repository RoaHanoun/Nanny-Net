import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = () => {
    let isError = false;
  
    // Name validation (accepts alphabetic characters and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      setNameError('Name must contain only alphabetic characters and spaces.');
      isError = true;
    } else {
      setNameError('');
    }
  
    // Username validation (accepts alphanumeric characters and underscores)
    const usernameRegex = /^\w{3,}$/;
    if (!username || !usernameRegex.test(username)) {
      setUsernameError('Username must be at least 3 characters and can contain letters, numbers, and underscores.');
      isError = true;
    } else {
      setUsernameError('');
    }
  
    // Password validation
    const passwordRegex = /^(?=.*\d).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters and contain a number.');
      isError = true;
    } else {
      setPasswordError('');
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
      isError = true;
    } else {
      setEmailError('');
    }
  
    if (isError) {
      Alert.alert('Error', 'Please correct the errors.');
      return;
    }
    
    // Simulating successful login, navigate to Signup2
    navigation.navigate('Signup2', { name, username, email, password });
    // Clear the input fields after the signup button is clicked
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <View style={styles.form}>
          <Text style={styles.title}>Create an Account</Text>
          <TextInput
            style={[styles.input, nameError && styles.errorBorder]}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <TextInput
            style={[styles.input, usernameError && styles.errorBorder]}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
          <TextInput
            style={[styles.input, emailError && styles.errorBorder]}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TextInput
            style={[styles.input, passwordError && styles.errorBorder]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.bottomButtonText}>Already Have An Account?</Text>
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
    backgroundColor: '#fff0ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomButtonText: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  errorBorder: {
    borderColor: 'red',
  },
});

export default Signup;
