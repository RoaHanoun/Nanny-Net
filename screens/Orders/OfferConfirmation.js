import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OfferConfirmation = ({ navigation, route }) => {
  const { data } = route.params;

  const handleGotIt = () => {
    navigation.replace('Babysitter');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Offer Confirmation</Text> */}
      {/* Display specific details from the data object */}
      <Text style={styles.text}>{data.responseEntity.body}</Text>


      <Text style={styles.subtitle}>
        Please wait for the Admin to approve your request and send you the confirmation email.
      </Text>

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#556b8d',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#556b8d',
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

export default OfferConfirmation;
