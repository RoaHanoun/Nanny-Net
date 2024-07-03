import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const EditProfileB = ({ navigation, route }) => {
  const { userData } = route.params;

  const refreshScreen = () => {
    navigation.replace('ProfileB');
  };

  const [name, setName] = useState(userData?.user?.name || '');
  const [username, setUsername] = useState(userData?.user?.username || '');
  const [email, setEmail] = useState(userData?.user?.email || '');
  const [city, setCity] = useState(userData?.city || '');
  const [phone, setPhone] = useState(userData?.user?.telNumber || '');
  const [description, setDescription] = useState(userData?.user?.describtion || '');
  const [gender, setGender] = useState(userData?.user?.gender || '');
  const [accountNumber, setAccountNumber] = useState(userData?.accountNumber || '');

  const validateAccountNumber = (text) => {
    const regex = /^\d{0,16}$/;
    if (regex.test(text)) {
      // Format groups of 4 digits with '-'
      let formattedText = text.replace(/(\d{4})(?=\d)/g, '$1-');
      return formattedText;
    }
    return ''; // Invalid input
  };

  const handleAccountNumberChange = (text) => {
    const validatedText = validateAccountNumber(text.replace(/[^0-9]/g, ''));
    setAccountNumber(validatedText);
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const accountNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

    if (!nameRegex.test(name)) {
      Alert.alert('Invalid Name', 'Name should only contain characters and spaces.');
      return false;
    }
    if (!accountNumberRegex.test(accountNumber)) {
      Alert.alert('Invalid Account Number', 'Account number must be in format xxxx-xxxx-xxxx-xxxx.');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be 10 digits.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const userData = {
        name,
        username,
        email,
        city,
        telNumber: phone,
        describtion: description,
        gender,
        accountNumber,
      };

      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('jwt'); // Adjust the key according to your implementation

        // If token is not available, handle the case accordingly
        if (!token) {
          console.error('Token not found.');
          return;
        }

        // Add token to request headers
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        // Make POST request with token included in headers
        const response = await axios.post('http://176.119.254.188:8080/provider/edit', userData, config);
        console.log('API Response:', response.data);
        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: refreshScreen } // Call the refresh function after dismissing the alert
        ]);
      } catch (error) {
        console.error('API Error:', error);
        // Handle error
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.photoUpload}>
        <Image
          source={require('../../assets/Profile.jpg')} // Replace with your image path
          style={styles.profilePic}
        />
      </TouchableOpacity>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={userData?.user?.name ? '' : 'Name'}
        style={styles.input}
      />
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder={userData?.user?.username ? '' : 'Username'}
        style={[styles.input, { backgroundColor: '#f0f0f0', color: '#888' }]} // Disabled style
        editable={false} // Make it uneditable
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={userData?.user?.email ? '' : 'Email'}
        style={styles.input}
      />
      <RNPickerSelect
        onValueChange={(value) => setCity(value)}
        items={[
          { label: 'Nablus', value: 'Nablus' },
          { label: 'Ramallah', value: 'Ramallah' },
          { label: 'BeithLehem', value: 'BeithLehem' },
          { label: 'Rafat', value: 'Rafat' },
          { label: 'Jenin', value: 'Jenin' },
          { label: 'Tolkarem', value: 'Tolkarem' },
          { label: 'Hebron', value: 'Hebron' },
          { label: 'Quds', value: 'Quds' },
          { label: 'Salfeet', value: 'Salfeet' },
          { label: 'Beit sahour', value: 'Beit sahour' },

        ]}
        style={pickerSelectStyles}
        placeholder={{ label: userData?.user?.city || 'Select City...', value: null }}
        value={city}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder={userData?.user?.telNumber ? '' : 'Phone'}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder={userData?.user?.describtion ? '' : 'Description (Optional)'}
        style={styles.input}
      />
      <TextInput
        value={gender}
        editable={false}
        placeholder="Gender"
        style={[styles.input, { backgroundColor: '#f0f0f0', color: '#888' }]} // Disabled style
      />
      <TextInput
        style={styles.input}
        onChangeText={handleAccountNumberChange}
        value={accountNumber}
        placeholder={userData?.user?.accountNumber ? `Account Number (${userData?.user?.accountNumber.replace(/(.{4})/g, '$1-')})` : 'Account Number (xxxx-xxxx-xxxx-xxxx)'}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff0ec', // Background color
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20, // Border radius for fields
    marginBottom: 15, // Padding between fields
    padding: 10,
  },
  photoUpload: {
    alignSelf: 'center',
    marginBottom: 15, // Padding below the photo upload
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
  },
  button: {
    backgroundColor: '#c2274b',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    height: 50, // Button height
    width: '80%', // Button width
    marginTop: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16, // Text font size
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30, // to ensure the
  },
});

export default EditProfileB;