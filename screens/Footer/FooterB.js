// Footer.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You might need to install this package

const FooterB = ({ navigation }) => {
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigateToScreen('BabysitterB')} style={styles.iconContainer}>
        <FontAwesome name="child" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('OrdersB')} style={styles.iconContainer}>
        <FontAwesome name="shopping-cart" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('ProfileB')} style={styles.iconContainer}>
        <FontAwesome name="user" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('BlogB')} style={styles.iconContainer}>
        <FontAwesome name="comment" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff0ec', // Customize as needed
    height: 45, // Customize as needed
    elevation: 20, // For Android shadow
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // borderColor: '#c2274b',
    // borderWidth:1,
    borderRadius:3,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FooterB;
