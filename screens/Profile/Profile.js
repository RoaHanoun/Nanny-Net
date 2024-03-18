import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './Stayles'; // Import styles from the separate file
import Footer from '../Footer/Footer'; // Import the Footer component

const Profile = () => {
  const navigation = useNavigation();

  // Dummy data for the profile
  const userProfile = [
    {
      name: 'Roa Hanoun',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'roahanoun@gmail.com',
      // Add more profile data as needed
    },
    {
      name: 'Malak',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'malak@example.com',
      // Add more profile data as needed
    },
    {
      name: 'Jane Doe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'janedoe@example.com',
      // Add more profile data as needed
    },
  ];

  // Choose the index of the profile you want to display
  const profileIndex = 0; // You can change this index based on your requirements

  const handleEditProfile = () => {
    // Navigate to the edit screen (replace 'EditProfile' with your actual edit screen name)
    navigation.navigate('EditProfile', { userProfile: userProfile[profileIndex] });
  };

  return (
    <View style={Styles.container}>
      {/* Cover photo */}
      <Image
        source={require('../../assets/123.jpg')} 
        style={Styles.coverImage}
        resizeMode="cover"
      />

      {/* Personal photo */}
      <Image
        source={require('../../assets/Profile.jpg')} 
        style={Styles.profileImage}
        resizeMode="cover"
      />

      {/* Name */}
      <Text style={Styles.nameText}>{userProfile[profileIndex].name}</Text>

      {/* Description */}
      <Text style={Styles.descriptionText}>{userProfile[profileIndex].description}</Text>

      {/* Email */}
      <Text style={Styles.emailText}>{userProfile[profileIndex].email}</Text>

      {/* Edit Profile button */}
      <TouchableOpacity style={Styles.editButton} onPress={handleEditProfile}>
        <Text style={Styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

export default Profile;
