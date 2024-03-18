import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Conformation = ({ navigation }) => {
  const handleGotIt = () => {
    // Handle the action when "Got It" button is pressed
    // You can navigate to another screen or perform other actions
    // For now, let's navigate back to the home screen
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Request Submitted!</Text>
      <Text style={styles.subtitle}>
        Please wait for the nanny to approve your request and send you the video chat link.
      </Text>

      {/* "Got It" button */}
      <TouchableOpacity style={styles.gotItButton} onPress={handleGotIt}>
        <Text style={styles.gotItButtonText}>Got It</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0ec',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c2274b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#556b8d',
    marginBottom: 20,
  },
  gotItButton: {
    backgroundColor: '#c2274b',
    padding: 10,
    borderRadius: 5,
  },
  gotItButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Conformation;
