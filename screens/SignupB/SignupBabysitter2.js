import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupBabysitter2 = ({ navigation, route }) => {
  // Check if route.params is undefined
  if (!route.params) {
    console.error('Route params are undefined.');
    return null; // Return null or any other appropriate fallback UI
  }

  // Destructure parameters safely
  const { name, username, email, password, gender, type } = route.params;

  const [telephone, setTelephone] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [dateError, setDateError] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [cityError, setCityError] = useState('');
  const [descError, setDescError] = useState('');

  const handleSignup = async () => {
    let isError = false;
  
    const telephoneRegex = /^[0-9]{10}$/;
    if (!telephone || !telephoneRegex.test(telephone)) {
      setTelephoneError('Please enter a valid telephone number.');
      isError = true;
    } else {
      setTelephoneError('');
    }
  
    // Remove "-" from account number
    const cleanedAccountNumber = accountNumber.replace(/[^\d]/g, '');
    if (!cleanedAccountNumber || cleanedAccountNumber.length !== 16) {
      setAccountNumberError('Account number must be exactly 16 digits.');
      isError = true;
    } else {
      setAccountNumberError('');
    }
  
    if (!city) {
      setCityError('Please select a city.');
      isError = true;
    } else {
      setCityError('');
    }
  
    const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      setDateError('Please enter a valid date in YYYY-MM-DD format.');
      isError = true;
    } else {
      setDateError('');
    }
  
    if (isError) {
      Alert.alert('Error', 'Please correct the errors.');
      return;
    }
  
    // Log user data before sending to the API
    console.log('User Data:', {
      name,
      username,
      email,
      password,
      telNumber: telephone,
      gender,
      type,
      extraDescription: desc,
      city,
      accountNumber: cleanedAccountNumber, // Use cleaned account number
      date,
    });
  
    const userData = {
      name,
      username,
      email,
      password,
      telNumber: telephone,
      gender,
      type,
      extraDescription: desc,
      city,
      accountNumber: cleanedAccountNumber, // Use cleaned account number
      date,
    };
  
    try {
      const response = await axios.post('http://176.119.254.188:8080/signup/provider', userData);
      if (response.status === 200) {
        // Handle successful signup response
        console.log('Signup successful:', response.data);
        navigation.navigate('ConfirmSignUp');
      } else {
        // Handle other response statuses if needed
        console.log('Signup unsuccessful:', response.data);
      }
    } catch (error) {
      // Handle signup error
      console.error('Signup error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };
  
  // Modified setAccountNumber function to strip non-digits
  <TextInput
    style={[styles.input, accountNumberError && styles.errorBorder]}
    placeholder="Account Number (xxxx-xxxx-xxxx-xxxx)"
    value={accountNumber}
    onChangeText={(text) => setAccountNumber(text.replace(/[^\d]/g, ''))}
    keyboardType="numeric"
  />
  

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <View style={styles.form}>
          <Text style={styles.title}>Create an Account</Text>
          <TextInput
            style={[styles.input, telephoneError && styles.errorBorder]}
            placeholder="Telephone Number"
            value={telephone}
            onChangeText={text => setTelephone(text)}
            keyboardType="numeric"
          />
          {telephoneError ? <Text style={styles.errorText}>{telephoneError}</Text> : null}

          <Text style={styles.sectionTitle}>City</Text>
          <RNPickerSelect
            placeholder={{ label: 'Select City', value: null }}
            onValueChange={(value) => setCity(value)}
            items={[
              { label: 'Nablus', value: 'Nablus' },
              { label: 'Ramallah', value: 'Ramallah' },
              { label: 'Betlahem', value: 'Betlahem' },
              { label: 'Rafat', value: 'Rafat' },
              { label: 'Jenin', value: 'Jenin' },
              { label: 'Tolkarem', value: 'Tolkarem' },
              { label: 'Hebron', value: 'Hebron' },
              { label: 'Quds', value: 'Quds' },
              { label: 'sfas', value: 'sfas' },
            ]}
            style={{ ...pickerSelectStyles }}
          />
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}

          <TextInput
            style={[styles.input, descError && styles.errorBorder]}
            placeholder="Description"
            value={desc}
            onChangeText={text => setDesc(text)}
          />
          {descError ? <Text style={styles.errorText}>{descError}</Text> : null}

          <View style={styles.dateContainer}>
            <TextInput
              style={[styles.dateInput, dateError && styles.errorBorder]}
              placeholder="YYYY"
              value={year}
              onChangeText={text => setYear(text)}
              keyboardType="numeric"
              maxLength={4}
            />
            <TextInput
              style={[styles.dateInput, dateError && styles.errorBorder]}
              placeholder="MM"
              value={month}
              onChangeText={text => setMonth(text)}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.dateInput, dateError && styles.errorBorder]}
              placeholder="DD"
              value={day}
              onChangeText={text => setDay(text)}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

          <TextInput
            style={[styles.input, accountNumberError && styles.errorBorder]}
            placeholder="Account Number (xxxx-xxxx-xxxx-xxxx)"
            value={accountNumber}
            onChangeText={(text) => setAccountNumber(text.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1-').slice(0, 19))}
            keyboardType="numeric"
          />
          {accountNumberError ? <Text style={styles.errorText}>{accountNumberError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.bottomButtonText}>Already Have An Account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#fff0ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  form: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#556b8d',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#556b8d',
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '30%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#556b8d',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#fff0ec',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c2274b',
    alignItems: 'center',
  },
  buttonText: {
    color: '#c2274b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomButtonText: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  errorBorder: {
    borderColor: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkboxText: {
    marginLeft: 5,
    marginRight: 5,
  },
  checked: {
    backgroundColor: '#fff0ec',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#556b8d',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 10,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 10,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the
  },
});

export default SignupBabysitter2;
