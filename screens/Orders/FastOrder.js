import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FastOrder = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [periodFrom, setPeriodFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStreet, setLocationStreet] = useState('');
  const [locationDesc, setLocationDesc] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [babysitterType, setBabysitterType] = useState('');
  const [babysitterGender, setBabysitterGender] = useState('');
  const [additionalDesc, setAdditionalDesc] = useState('');
  const [starRating, setStarRating] = useState(null);

  
  // Times and periods arrays
  const times = [
    { label: '1:00', value: '1:00' },
    { label: '2:00', value: '2:00' },
    { label: '3:00', value: '3:00' },
    { label: '4:00', value: '4:00' },
    { label: '5:00', value: '5:00' },
    { label: '6:00', value: '6:00' },
    { label: '7:00', value: '7:00' },
    { label: '8:00', value: '8:00' },
    { label: '9:00', value: '9:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
  ];

  const periods = [
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];

  
  // Fetch current location on component mount
  useEffect(() => {
  }, []);

  const handleOrder = async () => {
    try {
      console.log('Handle Order Button Pressed'); // Debug log
      alert('Submitting order...');

      const token = await AsyncStorage.getItem('jwt');

      // Validate required fields
      if (
        !selectedDate ||
        !timeFrom ||
        !periodFrom ||
        !timeTo ||
        !periodTo ||
        !locationCity ||
        !numberOfChildren
      ) {
        alert('Please fill in all required fields with valid data');
        return;
      }

      // Prepare order data
      const orderDateStr = String(selectedDate);
      const startTimeStr = `${String(timeFrom)} ${String(periodFrom).toUpperCase()}`;
      const endTimeStr = `${String(timeTo)} ${String(periodTo).toUpperCase()}`;
      const numOfKidsStr = String(numberOfChildren);
      const locationCityStr = String(locationCity);
      const locationStreetStr = String(locationStreet);
      const locationDescStr = String(locationDesc || "");
      const starRatingValue = starRating !== null ? String(starRating) : ""; // Include star rating
      const babysitterTypeStr = String(babysitterType); // Include babysitter type

      // Construct description string with babysitter type and star rating
      let descriptionStr = additionalDesc ? `${additionalDesc}. ` : "";
      descriptionStr += `Babysitter Type: ${babysitterTypeStr}. `;
      descriptionStr += starRatingValue ? `Star Rating: ${starRatingValue}` : "";

      const orderData = {
        orderDate: orderDateStr,
        startTime: startTimeStr,
        endTime: endTimeStr,
        description: descriptionStr,
        numOfKids: numOfKidsStr,
        location: {
          city: locationCityStr,
          streetData: locationStreetStr,
          extraDescription: locationDescStr,
        },
      };

      console.log('Order Info:', orderData); // Debug log

      // Send POST request to API
      const response = await axios.post('http://176.119.254.188:8080/customer/fastOrder/request', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        navigation.navigate('ConfirmFastOrder', {
          // Pass any additional data if needed
        });
      } else {
        console.error('Failed to send order:', response.status);
        alert('Failed to place the order. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending order:', error);
      alert('An error occurred while placing the order. Please try again later.');
    }
  };

  const cities = [
    { label: 'Nablus', value: 'Nablus' },
    { label: 'Ramallah', value: 'Ramallah' },
    { label: 'Betlahem', value: 'Betlahem' },
    { label: 'Rafat', value: 'Rafat' },
    { label: 'Jenin', value: 'Jenin' },
    { label: 'Tolkarem', value: 'Tolkarem' },
    { label: 'Hebron', value: 'Hebron' },
    { label: 'Quds', value: 'Quds' },
    { label: 'sfas', value: 'sfas' },
  ];

  const genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const babysitterTypes = [
    { label: 'Medical', value: 'Medical' },
    { label: 'Above 5Y old', value: 'Above 5Y old' },
    { label: 'Under 5Y old', value: 'Under 5Y old' },
    { label: 'Special care', value: 'Special care' },
  ];

  const starOptions = [
    { label: '1 star', value: 1 },
    { label: '2 stars', value: 2 },
    { label: '3 stars', value: 3 },
    { label: '4 stars', value: 4 },
    { label: '5 stars', value: 5 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Date:</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />

      <Text style={styles.title}>Time From:</Text>
      <RNPickerSelect
        onValueChange={(value) => setTimeFrom(value)}
        items={times}
        value={timeFrom}
        placeholder={{ label: 'Select Time', value: '' }}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        onValueChange={(value) => setPeriodFrom(value)}
        items={periods}
        value={periodFrom}
        placeholder={{ label: 'AM/PM', value: '' }}
        style={pickerSelectStyles}
      />

      <Text style={styles.title}>Time To:</Text>
      <RNPickerSelect
        onValueChange={(value) => setTimeTo(value)}
        items={times}
        value={timeTo}
        placeholder={{ label: 'Select Time', value: '' }}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        onValueChange={(value) => setPeriodTo(value)}
        items={periods}
        value={periodTo}
        placeholder={{ label: 'AM/PM', value: '' }}
        style={pickerSelectStyles}
      />

      <Text style={styles.title}>Number of Children:</Text>
      <TextInput
        style={styles.input}
        value={numberOfChildren}
        onChangeText={(text) => setNumberOfChildren(text)}
        keyboardType="numeric"
        placeholder="Number of Children"
      />

      <Text style={styles.title}>Babysitter Type:</Text>
      <RNPickerSelect
        onValueChange={(value) => setBabysitterType(value)}
        items={babysitterTypes}
        value={babysitterType}
        placeholder={{ label: 'Select Type', value: '' }}
        style={pickerSelectStyles}
      />

      <Text style={styles.title}>Gender:</Text>
      <RNPickerSelect
        onValueChange={(value) => setBabysitterGender(value)}
        items={genders}
        value={babysitterGender}
        placeholder={{ label: 'Select Gender', value: '' }}
        style={pickerSelectStyles}
      />

      <Text style={styles.title}>Star Rating:</Text>
      <RNPickerSelect
        onValueChange={(value) => setStarRating(value)}
        items={starOptions}
        value={starRating}
        placeholder={{ label: 'Select Rating', value: '' }}
        style={pickerSelectStyles}
      />

      <Text style={styles.title}>Location City:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select City', value: '' }}
        onValueChange={(value) => setLocationCity(value)}
        items={cities}
        value={locationCity}
        style={pickerSelectStyles}
      />
      <TextInput
        style={styles.input}
        value={locationStreet}
        onChangeText={(text) => setLocationStreet(text)}
        placeholder="Street"
      />
      <TextInput
        style={styles.input}
        value={locationDesc}
        onChangeText={(text) => setLocationDesc(text)}
        placeholder="Description"
      />

      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff0ec',
  },
  title: {
    color: '#c2274b',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
    fontWeight: 'bold',
  },
  map: {
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#556b8d',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
});

export default FastOrder;
