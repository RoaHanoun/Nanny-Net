import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ navigation, route }) => {
  const { userData } = route.params;

  // State variables
  const [profileImage, setProfileImage] = useState(userData?.user?.profileImageUrl || '');
  const [name, setName] = useState(userData?.user?.name || '');
  const [username] = useState(userData?.user?.username || '');  // Non-editable
  const [email, setEmail] = useState(userData?.user?.email || '');
  const [phone, setPhone] = useState(userData?.user?.telNumber || '');
  const [gender] = useState(userData?.user?.gender || '');  // Non-editable
  const [city, setCity] = useState(userData?.location?.city || ''); 
  const [street, setStreet] = useState(userData?.location?.streetData || ''); 
  const [desc, setDesc] = useState(userData?.user?.describtion || '');
  const [token, setToken] = useState('');

  const selectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    const formData = new FormData();
    const uriParts = profileImage.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('image', {
      uri: profileImage,
      name: `profile.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await fetch('http://176.119.254.188:8080/upload/profile/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const updatedImageUrl = await response.text();
        setProfileImage(updatedImageUrl);
        console.log('Uploaded Image URL:', updatedImageUrl);
        Alert.alert('Success', 'Profile picture updated successfully!');
      } else {
        console.error('Failed to upload image');
        Alert.alert('Error', 'Failed to upload image. Please try again later.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image. Please try again later.');
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const descRegex = /^[a-zA-Z\s]*$/;
    const streetRegex = /^[a-zA-Z0-9\s]*$/;

    if (!nameRegex.test(name)) {
      Alert.alert('Invalid Name', 'Name should only contain characters and spaces.');
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
    if (!descRegex.test(desc)) {
      Alert.alert('Invalid Description', 'Description should only contain characters and spaces.');
      return false;
    }
    if (!streetRegex.test(street)) {
      Alert.alert('Invalid Street Name', 'Street should only contain characters, numbers, and spaces.');
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      const updatedUserData = {
        name,
        username,
        email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        telNumber: phone,
        describtion: desc,
        gender,
        location: {
          city,
          streetData: street,
          extraDescription: ''
        }
      };

      try {
        const jwt = await AsyncStorage.getItem('jwt');

        if (!jwt) {
          console.error('JWT token not found.');
          return;
        }

        setToken(jwt); // Update token state

        const config = {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        };

        // Update user information
        const response = await axios.post('http://176.119.254.188:8080/customer/edit', updatedUserData, config);
        console.log('API Response:', response.data);
        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: () => navigation.replace('Profile') } // Navigate back to Profile screen
        ]);

        // Upload profile image if selected
        if (profileImage) {
          await handleImageUpload();
        }

      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', 'An error occurred while updating the profile. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoUpload} onPress={selectImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profilePic} resizeMode="cover" />
        ) : (
          <Image source={require('../../assets/camera_icon.png')} style={styles.cameraIcon} />
        )}
      </TouchableOpacity>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={username}
        editable={false}
        placeholder="Username"
        style={[styles.input, styles.disabledInput]}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={gender}
        editable={false}
        placeholder="Gender"
        style={[styles.input, styles.disabledInput]}
      />
      <RNPickerSelect
        onValueChange={(value) => setCity(value)}
        items={[
          { label: 'Nablus', value: 'Nablus' },
          { label: 'Ramallah', value: 'Ramallah' },
          { label: 'Betlahem', value: 'Betlahem' },
          { label: 'Beit sahour', value: 'Beit sahour' },
          { label: 'Rafat', value: 'Rafat' },
          { label: 'Jenin', value: 'Jenin' },
          { label: 'Tolkarem', value: 'Tolkarem' },
          { label: 'Hebron', value: 'Hebron' },
          { label: 'Quds', value: 'Quds' },
          { label: 'Salfeet', value: 'Salfeet' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select City...', value: null }}
        value={city}
      />
      <TextInput
        value={street}
        onChangeText={setStreet}
        placeholder="Street"
        style={styles.input}
      />
      <TextInput
        value={desc}
        onChangeText={setDesc}
        placeholder="Description (Optional)"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff0ec',
  },
  photoUpload: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    padding: 10,
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
  },
  button1: {
    backgroundColor: '#c2274b',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    marginTop: 60,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default EditProfile;
