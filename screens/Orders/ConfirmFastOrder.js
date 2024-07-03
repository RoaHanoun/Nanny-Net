import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ConfirmFastOrder = ({ navigation,route }) => {
  // const {orderData } = route.params;

  const handleGotIt = () => {
    navigation.replace('Babysitter');
  };
  

  return (
    <View style={styles.container}>
    {/* <Text style={styles.title}>$</Text> */}

      <Text style={styles.heading}>Request Submitted!</Text>
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
    color:  '#556b8d',
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

export default ConfirmFastOrder;
