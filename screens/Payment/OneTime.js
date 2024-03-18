import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';

const OneTime = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStreet, setLocationStreet] = useState('');
  const [locationDesc, setLocationDesc] = useState('');
  const [babysitterType, setBabysitterType] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [babysitterGender, setBabysitterGender] = useState('');
  const [additionalDesc, setAdditionalDesc] = useState('');

  const cities = [
    { label: 'Select City', value: '' },
    { label: 'Nablus', value: 'Nablus' },
    { label: 'Ramallah', value: 'Ramallah' },
  ];

  const babysitterTypes = [
    { label: 'Select Type', value: '' },
    { label: 'Medical', value: 'Medical' },
    { label: 'Above 5 years old', value: 'Above 5 years old' },
    { label: 'Under 5 years old', value: 'Under 5 years old' },
    { label: 'Special Care', value: 'Special Care' },
  ];

  const genders = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const handleOrder = () => {
    // Validation for non-optional fields
    if (!selectedDate || !isValidTime(timeFrom) || !isValidTime(timeTo) || !locationCity || !babysitterType || !numberOfChildren) {
      alert('Please fill in all required fields with valid data');
      return;
    }


   // Navigate to PaymentScreen with required data
    navigation.navigate('Payment', {
    totalSalary: calculateTotalSalary(), // Pass any necessary data to PaymentScreen
   });

  

    // Implement the logic to handle the order and payment process
    // Use the state values to send the required information
    console.log('Order Placed:', {
      date: selectedDate,
      timeFrom,
      timeTo,
      location: {
        city: locationCity,
        street: locationStreet,
        desc: locationDesc,
      },
      babysitterType,
      numberOfChildren,
      babysitterGender,
      additionalDesc,
    });
  };
  const calculateTotalSalary = () => {
    // Implement your logic to calculate total salary based on selected options
    // For example, you can calculate based on babysitterType, numberOfChildren, etc.
    // Return the calculated total salary
    return 100; // Replace with your actual calculation logic
  };
  const isValidTime = (time) => {
    // Simple validation for time format (HH:mm AM/PM)
    const regex = /^(1[0-2]|0?[1-9]):[0-5]?[0-9] (AM|PM|pm|am)$/i;
    return regex.test(time);
  };

  return (
    <ImageBackground
      source={require('../../assets/back.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
       <View style={styles.overlay}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Date:</Text>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, marked: true },
          }}
        />

        <Text style={styles.title}>Time From:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTimeFrom(text)}
          value={timeFrom}
          placeholder="Enter time (HH:mm AM/PM)"
        />

        <Text style={styles.title}>Time To:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTimeTo(text)}
          value={timeTo}
          placeholder="Enter time (HH:mm AM/PM)"
        />

        <Text style={styles.title}>Location City:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select City', value: '' }}
          onValueChange={(value) => setLocationCity(value)}
          items={cities}
          value={locationCity}
          style={styles.picker}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLocationStreet(text)}
          value={locationStreet}
          placeholder="Street"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLocationDesc(text)}
          value={locationDesc}
          placeholder="Optional Description"
        />

        <Text style={styles.title}>Babysitter Type:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Type', value: '' }}
          onValueChange={(value) => setBabysitterType(value)}
          items={babysitterTypes}
          value={babysitterType}
          style={styles.picker}
        />

        <Text style={styles.title}>Number of Children:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNumberOfChildren(text)}
          value={numberOfChildren}
          keyboardType="numeric"
          placeholder="Enter number of children"
        />

        <Text style={styles.title}>Babysitter Gender (Optional):</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Gender', value: '' }}
          onValueChange={(value) => setBabysitterGender(value)}
          items={genders}
          value={babysitterGender}
          style={styles.picker}
        />

        <Text style={styles.title}>Additional Description (Optional):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAdditionalDesc(text)}
          value={additionalDesc}
          placeholder="Additional Description"
        />

          <TouchableOpacity style={styles.button} onPress={handleOrder}>
            <Text style={styles.buttonText}>Make Order</Text>
          </TouchableOpacity>      
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default OneTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Pink overlay with 50% opacity
  },
  title: {
    color: '#c2274b',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#556b8d',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
   // color: 'white',
  },
  picker: {
    height: 40,
    borderColor: '#556b8d',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'white',
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#c2274b',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
  },
});
