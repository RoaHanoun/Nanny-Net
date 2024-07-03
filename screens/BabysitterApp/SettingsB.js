import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SettingsB = ({ navigation, route }) => {
  const { userData } = route.params;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [describtion, setDescribtion] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (userData && userData.user) {
      setName(userData.user.name || '');
      setUsername(userData.user.username || '');
      setEmail(userData.user.email || '');
      setTelNumber(userData.user.telNumber || '');
      setDescribtion(userData.user.describtion || '');
      setCity(userData.city || '');
      setGender(userData.user.gender || '');
      setAccountNumber(userData.accountNumber || '');
    }
  }, [userData]);

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert('Password Mismatch', 'New password and confirmation password do not match.');
        return;
      }
      const jwt = await AsyncStorage.getItem('jwt');

      const editedUserData = {
        name: name,
        username: username,
        email: email,

        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,

        telNumber: telNumber,
        describtion: describtion,
        gender: gender,
        city: city,
        accountNumber: accountNumber,
      };

      console.log(editedUserData);
      const response = await axios.post(`http://176.119.254.188:8080/provider/edit`, editedUserData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your password has been changed.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Error', 'An error occurred while changing your password. Please try again later.');
      }
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert('Error', 'An error occurred while changing your password. Please try again later.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
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

export default SettingsB;
