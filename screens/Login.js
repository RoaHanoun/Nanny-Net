import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let isError = false;

    // Username validation
    const usernameRegex = /^[a-zA-Z]{3,}$/;
    if (!username || !usernameRegex.test(username)) {
      setUsernameError('Username must be at least 3 characters and contain no numbers.');
      isError = true;
    } else {
      setUsernameError('');
    }

    // Password validation
    const passwordRegex = /^(?=.*\d).{8,}$/;
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

      // Simulating successful login, navigate to CreateProfile
      navigation.navigate('CreateProfile');
      
    // Clear the input fields after the login button is clicked
    setUsername('');
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
          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupButtonContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
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
    // position: 'absolute',
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
  // signupButtonContainer: {
  //   position: 'absolute',
  //   bottom: 40,
  //   width: '100%',
  //   alignItems: 'center',
  // },
  // signupButton: {
  //   backgroundColor: 'white',
  //   padding: 10,
  //   borderRadius: 10,
  //   borderColor: "#c2274b",
  //   borderWidth: 1,
  //   width: '75%',
  //   alignItems: 'center',
  // },
  
  errorBorder: {
    borderColor: 'red',
  },
});

export default Login;
