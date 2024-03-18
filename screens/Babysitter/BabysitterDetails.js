import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You might need to install this package

const BabysitterDetails = ({ route, navigation }) => {
  // Extract the babysitterId from the navigation route params
  const { babysitterId } = route.params;

  // Dummy data for babysitter details
  const babysitterDetails = {
    '1': { name: 'Roa Hanoun', city: 'Nablus ', country: 'Palestine', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', hourlySalary: '$15' },
    '2': { name: 'Malak', city: 'Ramallah ', country: 'Palestine', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', hourlySalary: '$20' },
    '10': { name: 'Babysitter 3', city: 'City 3', country: 'Country 3', bio: 'Bio for Babysitter 3', hourlySalary: '$18' },
    '4': { name: 'Babysitter 4', city: 'City 4', country: 'Country 4', bio: 'Bio for Babysitter 4', hourlySalary: '$22' },
    '5': { name: 'Babysitter 5', city: 'City 5', country: 'Country 5', bio: 'Bio for Babysitter 5', hourlySalary: '$17' },
    '6': { name: 'Babysitter 6', city: 'City 6', country: 'Country 6', bio: 'Bio for Babysitter 6', hourlySalary: '$19' },
    '7': { name: 'Babysitter 7', city: 'City 7', country: 'Country 7', bio: 'Bio for Babysitter 7', hourlySalary: '$21' },
    '8': { name: 'Babysitter 8', city: 'City 8', country: 'Country 8', bio: 'Bio for Babysitter 8', hourlySalary: '$16' },
    '9': { name: 'Babysitter 9', city: 'City 9', country: 'Country 9', bio: 'Bio for Babysitter 9', hourlySalary: '$20' },
    '3': { name: 'Saliba', city: 'Betlahem ', country: 'Palestine ', bio: 'Bio for Saliba ', hourlySalary: '$50' },
  };

  // Get the details for the selected babysitter
  const selectedBabysitter = babysitterDetails[babysitterId];

  const handleBookNow = () => {
    // Navigate to the confirmation screen
    navigation.navigate('Book', {
      babysitterId,
      babysitterName: selectedBabysitter.name,
    });
  };

  return (
    <View style={styles.container}>
      {/* Cover photo */}
      <Image
        source={require('../../assets/123.jpg')} // Replace with your cover photo
        style={styles.coverImage}
        resizeMode="cover"
      />

      {/* Profile photo */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../assets/Profile.jpg')} // Replace with your profile photo
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>

      {/* Name */}
      <Text style={styles.name}>{selectedBabysitter.name}</Text>

      {/* Babysitter details */}
      <View style={styles.babysitterCard}>
        <Text style={styles.infoTitle}>Location</Text>
        <Text style={styles.infoText}>{`${selectedBabysitter.city}, ${selectedBabysitter.country}`}</Text>

        <Text style={styles.infoTitle}>Bio</Text>
        <Text style={styles.infoText}>{selectedBabysitter.bio}</Text>

        <Text style={styles.infoTitle}>Hourly Salary</Text>
        <Text style={styles.infoText}>{selectedBabysitter.hourlySalary}</Text>
      </View>

      {/* "Book Now" button with icon */}
      <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
        <FontAwesome name="send" size={20} color="#fff" />
        <Text style={styles.bookNowButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -50, // Adjust to center the profile image over the cover photo
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff', // White border for the profile image
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  babysitterCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c2274b',
    marginBottom: 5,
  },
  infoText: {
    color: '#556b8d',
    marginBottom: 10,
  },
  bookNowButton: {
    backgroundColor: '#c2274b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  bookNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 30,

  },
});

export default BabysitterDetails;
