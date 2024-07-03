import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Choose = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>NANNY NET</Text>
        <Text style={styles.slogan}>A COMMUNITY OF HAPPY CHILD</Text>

        <View >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupBabysitter')}>
            <Text style={styles.buttonText}>Babysitter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Parent</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff0ec",
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 38,
    color: '#556b8d',
    marginTop: 10,
  },
  slogan: {
    fontSize: 12,
    color: '#556b8d',
    marginBottom: 200,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff0ec',
    padding: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c2274b',
    alignItems: 'center',
    marginVertical: 10,
    
  },
  buttonText: {
    color: '#c2274b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Choose;
