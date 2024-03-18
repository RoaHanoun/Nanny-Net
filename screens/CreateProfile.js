import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CreateProfile = ({navigation}) => {
  const handleCreateProfile = () => {
    navigation.navigate('Babysitter');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Profile Picture</Text>
      <Text style={styles.slogan}>So that everyone can get to know you!</Text>

      <TouchableOpacity style={styles.photoInput}>
        {/* Placeholder for choose photo */}
        <Text style={styles.photoPlaceholder}>Choose Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateProfile}>
        <Text style={styles.buttonText}>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0ec',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c2274b',
  },
  slogan: {
    marginBottom: 20,
    color: '#556b8d',
    textAlign: 'center',
  },
  photoInput: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#c2274b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoPlaceholder: {
    color: '#fff0ec',
  },
  createButton: {
    backgroundColor: '#c2274b',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 25,
    // borderWidth:1,
    // borderColor: '#556b8d',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff0ec',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProfile;
