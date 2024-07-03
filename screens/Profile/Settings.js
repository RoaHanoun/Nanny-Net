import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Settings = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [describtion, setDescribtion] = useState('');
  const [city, setCity] = useState('');
  const [streetData, setStreetData] = useState('');
  const [gender, setGender] = useState('');
  const [extraDescription, setExtraDescription] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('id'); // Get user ID from AsyncStorage
        const jwt = await AsyncStorage.getItem('jwt'); // Get JWT from AsyncStorage

        if (id && jwt) {
          const response = await axios.get(`http://176.119.254.188:8080/customer/${id}`, {
            headers: {
              Authorization: `Bearer ${jwt}`, // Include JWT in request headers
            },
          });

          const { user, location } = response.data;

          console.log('User Data:', user);
          console.log('Location Data:', location);

          setName(user?.name || '');
          setUsername(user?.username || '');
          setEmail(user?.email || '');
          setTelNumber(user?.telNumber || '');
          setDescribtion(user?.describtion || '');
          setCity(location?.city || '');
          setStreetData(location?.streetData || '');
          setGender(user?.gender || '');
          setExtraDescription(user?.extraDescription || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'An unexpected error occurred while fetching user data. Please try again later.');
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert('Password Mismatch', 'New password and confirmation password do not match.');
        return;
      }
  
      const id = await AsyncStorage.getItem('id');
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
        location: {
          city: city,
          streetData: streetData,
          extraDescription: extraDescription
        }
      };
  
      const response = await axios.post(`http://176.119.254.188:8080/customer/edit`, editedUserData, {
        headers: {
          Authorization: `Bearer ${jwt}`
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

export default Settings;
