import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const EditProfileB = ({ navigation, route }) => {
  const { userData } = route.params;

  const refreshScreen = () => {
    navigation.replace('ProfileB');
  };

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Permission Required', 'Permission to access camera roll is required!');
  //     }
  //   })();
  // }, []);

  const [profileImage, setProfileImage] = useState(userData?.user?.profileImageUrl || '');
  const [name, setName] = useState(userData?.user?.name || '');
  const [username] = useState(userData?.user?.username || ''); // Non-editable
  const [email, setEmail] = useState(userData?.user?.email || '');
  const [city, setCity] = useState(userData?.city || '');
  const [phone, setPhone] = useState(userData?.user?.telNumber || '');
  const [description, setDescription] = useState(userData?.user?.describtion || '');
  const [gender] = useState(userData?.user?.gender || ''); // Non-editable
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
        const token = await AsyncStorage.getItem('jwt');

        if (!token) {
          console.error('Token not found.');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.post('http://176.119.254.188:8080/provider/edit', userData, config);
        console.log('API Response:', response.data);
        Alert.alert('Success', 'Profile updated successfully!', [
          { text: 'OK', onPress: refreshScreen }
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
        // console.log('Uploaded Image URL:', updatedImageUrl);
        Alert.alert('Success', 'Profile picture updated successfully!');
        navigation.replace('ProfileB');
      } else {
        console.error('Failed to upload image');
        Alert.alert('Error', 'Failed to upload image. Please try again later.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        placeholder={userData?.user?.name ? '' : 'Name'}
        style={styles.input}
      />
      <TextInput
        value={username}
        onChangeText={() => null}
        placeholder={userData?.user?.username ? '' : 'Username'}
        style={[styles.input, { backgroundColor: '#f0f0f0', color: '#888' }]}
        editable={false}
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
          { label: 'Bethlehem', value: 'Bethlehem' },
          { label: 'Rafat', value: 'Rafat' },
          { label: 'Jenin', value: 'Jenin' },
          { label: 'Tulkarem', value: 'Tulkarem' },
          { label: 'Hebron', value: 'Hebron' },
          { label: 'Quds', value: 'Quds' },
          { label: 'Salfit', value: 'Salfit' },
          { label: 'Beit Sahour', value: 'Beit Sahour' },
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
        onChangeText={() => null}
        placeholder="Gender"
        style={[styles.input, { backgroundColor: '#f0f0f0', color: '#888' }]}
        editable={false}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleAccountNumberChange}
        value={accountNumber}
        placeholder={userData?.user?.accountNumber ? `Account Number (${userData?.user?.accountNumber.replace(/(.{4})/g, '$1-')})` : 'Account Number (xxxx-xxxx-xxxx-xxxx)'}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  button: {
    backgroundColor: '#c2274b',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    marginTop: 70,
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
