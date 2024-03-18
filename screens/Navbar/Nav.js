// Nav.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from 'react-native-elements';
import styles from './Styles'; // Assuming styles.js is in the same directory
const Nav = () => {
  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        centerComponent={
          <View style={styles.titleContainer}>
            <Text style={styles.title}>NANNY NET</Text>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
        }
      />
    
    </View>
  );
};

export default Nav;
