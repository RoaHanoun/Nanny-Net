import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Conformation = ({ navigation,route }) => {
  const { totalSalary, orderData } = route.params;

  const handleGotIt = () => {
    navigation.navigate('BindingOrder', { orderData, totalSalary });
  };
  

  return (
    <View style={styles.container}>
            <Text style={styles.title}>{totalSalary}$</Text>

      <Text style={styles.heading}>Request Submitted!</Text>
      <Text style={styles.subtitle}>
        Please wait for the nanny to approve your request and send you the video chat link.
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

export default Conformation;
