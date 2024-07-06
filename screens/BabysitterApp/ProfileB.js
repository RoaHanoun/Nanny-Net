import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // Import Axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import EditProfileB from '../BabysitterApp/EditProfileB'; // Import EditProfile component
import FooterB from '../Footer/FooterB';

const ProfileB = ({ navigation }) => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [profileImageUrl, setProfileImageUrl] = useState(null); // State to store profile image URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('id'); // Get user ID from AsyncStorage
        const jwt = await AsyncStorage.getItem('jwt'); // Get JWT from AsyncStorage

        if (id && jwt) {
          const response = await axios.get(`http://176.119.254.188:8080/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${jwt}`, // Include JWT in request headers
            },
          });

          setUserData(response.data); // Set the fetched user data to state
          // console.log('User Data:', userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'An unexpected error occurred while fetching user data. Please try again later.');
      }
    };
    const fetchProfileImage = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (id) {
          // console.log(`Fetching profile image for user ID: ${id}`);
          const responseImage = await fetch(`http://176.119.254.188:8080/user/image/${id}`);
          
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
          console.warn('User ID not found in Async Storage.');
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
    
    
    fetchUserData();
    fetchProfileImage();

  }, []);
  const handleEditPress = () => {
    if (userData) {
      navigation.navigate('EditProfileB', { userData: userData });
    }
  };
  const handleWebPress = () => {
    Linking.openURL('https://www.facebook.com/roaa.hannon');
  };
  return (
    
    <View style={styles.container}>
      {/* Render user data */}
      {userData && (
        <>
          <Image
            source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/Profile.jpg')}
            style={styles.profilePic}
          />
          <Text style={styles.name}>{userData.user.name}</Text>
          <Text style={styles.title}>{userData.user.email}</Text>
        </>
      )}
      <View style={styles.menuContainer}>
        {/* Render menu items */}
        <MenuItem icon="pencil" text="Edit profile" onPress={handleEditPress}/>
        <MenuItem icon="cog" text="Settings" showBorder={true} onPress={() => navigation.navigate('SettingsB', { userData: userData })}/>
        <View style={{ paddingTop: 40 }}></View>
        <MenuItem icon="globe" text="See Our Web" onPress={handleWebPress} />
        <MenuItem icon="question-circle" text="Help" onPress={() => navigation.navigate('HelpScreen')}/>
        <MenuItem icon="star" text="Rate Us" onPress={() => navigation.navigate('BlogScreen')}/>

      </View>
      <FooterB navigation={navigation} />

    </View>
  );
};

const MenuItem = ({ icon, text, showBorder ,onPress }) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      showBorder ? styles.border : null, 
    ]}
    onPress={onPress}
  >
    <Icon name={icon} size={20} color="#c2274b" />
    <Text style={styles.menuText}>{text}</Text>
    <Icon name="angle-right" size={20} color="#000" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff0ec',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
  },
  title: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  menuContainer: {
    width: '100%',
   backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingBottom: 150,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
  },
  border: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default ProfileB;