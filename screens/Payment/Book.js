// Book.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Book = () => {
  const navigation = useNavigation();

  const handleOneTimeOrder = () => {
    navigation.navigate('OneTime');
  };

  const handleContractOrder = () => {
    navigation.navigate('Contract');
  };

  return (
    <ImageBackground
      source={require('../../assets/img.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOneTimeOrder}>
            <Text style={styles.buttonText}>ONE TIME ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleContractOrder}>
            <Text style={styles.buttonText}>CONTRACT ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
   //backgroundColor: '#556b8d',
   // backgroundColor: 'rgba(173, 216, 230, 0.8)', // Baby Blue with opacity
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    backgroundColor: '#fff0ec', // Baby Pink
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#c2274b', // Baby Pink
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Book;
