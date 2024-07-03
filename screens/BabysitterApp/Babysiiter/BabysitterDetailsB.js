import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const BabysitterDetailsB = ({ route }) => {
  const { babysitterId } = route.params;
  const [babysitterDetails, setBabysitterDetails] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    fetchData();
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      if (babysitterId) {
        console.log(`Fetching profile image for babysitter ID: ${babysitterId}`);
        const responseImage = await fetch(`http://176.119.254.188:8080/user/image/${babysitterId}`);
        
        if (responseImage.ok) {
          const imageData = await responseImage.blob(); // Convert response to Blob
          const base64Image = await convertBlobToBase64(imageData); // Convert Blob to base64
          setProfileImageUrl(`data:image/jpeg;base64,${base64Image}`); // Use base64 string as image source
          console.log('Profile image fetched successfully.');
        } else {
          // console.error('Failed to fetch profile image');
          setProfileImageUrl(null); // Fallback to default image
        }
      } else {
        console.warn('Babysitter ID not provided.');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      Alert.alert('Error', 'An unexpected error occurred while fetching profile image. Please try again later.');
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1]; // Extract base64 string
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://176.119.254.188:8080/employee/${babysitterId}`);
      setBabysitterDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/123.jpg')}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.profileImageContainer}>
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require('../../../assets/Profile.jpg')}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.name}>{babysitterDetails?.user?.name}</Text>
      <Text style={styles.TextEmail}>{babysitterDetails?.user?.email}</Text>

      <View style={styles.babysitterCard}>
        <Text style={styles.infoTitle}>Location</Text>
        <Text style={styles.infoText}>{babysitterDetails?.city}</Text>

        <Text style={styles.infoTitle}>Bio</Text>
        <Text style={styles.infoText}>{babysitterDetails?.user?.describtion}</Text>

        <Text style={styles.infoTitle}>Availability</Text>
        <Text style={styles.infoText}>{babysitterDetails?.availability}</Text>

        <Text style={styles.infoTitle}>Type</Text>
        <Text style={styles.infoText}>{babysitterDetails?.type}</Text>

        <Text style={styles.infoTitle}>Stars</Text>
        <View style={styles.starsContainer}>
          {babysitterDetails?.stars && [...Array(Math.floor(babysitterDetails.stars))].map((_, index) => (
            <FontAwesome key={index} name="star" size={20} color="#c2274b" style={{ marginRight: 5 }} />
          ))}
        </View>
      </View>
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
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  TextEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c2274b',
    textAlign: 'center',
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
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default BabysitterDetailsB;
