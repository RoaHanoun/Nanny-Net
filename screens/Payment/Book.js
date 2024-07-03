import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Book = ({ route }) => {
  const navigation = useNavigation();
  const { selectedBabysitters } = route.params; // Modify to receive babysitterIds instead of babysitterId

  const handleOneTimeOrder = () => {
    navigation.navigate('OneTime', { selectedBabysitters });
    console.log('selectedBabysitterIds:', selectedBabysitters);
    // Pass the babysitterIds to OneTime component
  };

  const handleContractOrder = () => {
    navigation.navigate('Contract', { selectedBabysitters }); // Pass the babysitterIds to Contract component
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
    backgroundColor: 'rgba(255, 240, 236, 0.8)', // Soft overlay color
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    backgroundColor: '#fff0ec', // Soft pink background
    padding: 20,
    borderRadius: 20,
    width: '90%', // Adjust width
    alignItems: 'center',
    shadowColor: '#000', // Shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#c2274b', // Deep pink color for contrast
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 15,
    borderRadius: 25,
    shadowColor: '#000', // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    // fontFamily: 'AvenirNext-DemiBold', // Custom font
    textAlign: 'center',
  },
});

export default Book;
