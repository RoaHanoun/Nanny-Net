import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure you have expo vector icons installed

const HelpScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:roa.j.hanoun@gmail.com');
  };

  const handleChatPress = () => {
    Linking.openURL('tel:0598175773');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/back.jpg')} // Replace with your image path
        style={styles.topImage}
      />
      {/* <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} /> */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>How can we help you?</Text>
        <Text style={styles.subHeaderText}>
          It looks like you are experiencing problems with our sign up process. We are here to help so please get in touch with us.
        </Text>
      </View>
      <View style={styles.supportOptions}>
        <TouchableOpacity style={styles.supportButton} onPress={handleChatPress}>
          <MaterialCommunityIcons name="phone" size={24} color="white" />
          <Text style={styles.buttonText}>Call us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportButton} onPress={handleEmailPress}>
          <MaterialCommunityIcons name="email" size={24} color="white" />
          <Text style={styles.buttonText}>Email us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0ec',
  },
  topImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // or 'contain' depending on your image
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  headerContainer: {
    marginTop:40 , // Adjust this value as needed to position your text over the image
    alignItems: 'center',
  },
  headerText: {
    color: '#c2274b',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:15,
  },
  subHeaderText: {
    color: '#556b8d',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  supportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  supportButton: {
    backgroundColor: '#c2274b', // Button background color
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

export default HelpScreen;
