import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OneTime = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [periodFrom, setPeriodFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStreet, setLocationStreet] = useState('');
  const [locationDesc, setLocationDesc] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [babysitterGender, setBabysitterGender] = useState('');
  const [additionalDesc, setAdditionalDesc] = useState('');

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

  const times = [
    { label: '12:00', value: '12:00' },
    { label: '12:30', value: '12:30' },
    { label: '1:00', value: '1:00' },
    { label: '1:30', value: '1:30' },
    { label: '2:00', value: '2:00' },
    { label: '2:30', value: '2:30' },
    { label: '3:00', value: '3:00' },
    { label: '3:30', value: '3:30' },
    { label: '4:00', value: '4:00' },
    { label: '4:30', value: '4:30' },
    { label: '5:00', value: '5:00' },
    { label: '5:30', value: '5:30' },
    { label: '6:00', value: '6:00' },
    { label: '6:30', value: '6:30' },
    { label: '7:00', value: '7:00' },
    { label: '7:30', value: '7:30' },
    { label: '8:00', value: '8:00' },
    { label: '8:30', value: '8:30' },
    { label: '9:00', value: '9:00' },
    { label: '9:30', value: '9:30' },
    { label: '10:00', value: '10:00' },
    { label: '10:30', value: '10:30' },
    { label: '11:00', value: '11:00' },
    { label: '11:30', value: '11:30' },
  ];

  const periods = [
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];

  const handleOrder = async () => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        const userId = await AsyncStorage.getItem('id');
        const { selectedBabysitters } = route.params;

        // Check for required fields
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

        // Prepare the data
        const orderDateStr = String(selectedDate);
        const startTimeStr = `${String(timeFrom)} ${String(periodFrom).toUpperCase()}`;
        const endTimeStr = `${String(timeTo)} ${String(periodTo).toUpperCase()}`;
        const descriptionStr = String(additionalDesc || "");
        const numOfKidsStr = String(numberOfChildren);
        const locationCityStr = String(locationCity);
        const locationStreetStr = String(locationStreet);
        const locationDescStr = String(locationDesc || "");

        const orderData = {
            listOfEmployeeIds: selectedBabysitters,
            orderDTO: {
                orderDate: orderDateStr,
                startTime: startTimeStr,
                endTime: endTimeStr,
                employeeId: String(userId),
                description: descriptionStr,
                numOfKids: numOfKidsStr,
                location: {
                    city: locationCityStr,
                    streetData: locationStreetStr,
                    extraDescription: locationDescStr
                }
            }
        };

        // Log the data for debugging
        console.log("Order Data:", orderData);

        // Make the API request
        const response = await axios.post('http://176.119.254.188:8080/customer/order/request', orderData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            }
        });

        // Check the response status
        if (response.status === 200) {
            const price = response.data;
            navigation.navigate('Conformation', {
                totalSalary: price,
                orderData,
            });
        } else {
            alert('Failed to place the order. Please try again later.');
        }
    } catch (error) {
        // Log the error for debugging
        console.error('Error making order:', error);

        // Provide detailed error messages
        if (error.response) {
            // Server responded with a status other than 2xx
            alert(`Error: ${error.response.data.message || 'Failed to place the order. Please try again later.'}`);
        } else if (error.request) {
            // Request was made but no response received
            alert('Error: No response received from the server.');
        } else {
            // Something else happened
            alert(`Error: ${error.message}`);
        }
    }
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

        <Text style={styles.title}>Number of Children:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNumberOfChildren(text)}
          value={numberOfChildren}
          keyboardType="numeric"
          placeholder="Enter number of children"
        />

        {/* <Text style={styles.title}>Babysitter Gender (Optional):</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Gender', value: '' }}
          onValueChange={(value) => setBabysitterGender(value)}
          items={genders}
          value={babysitterGender}
          style={pickerSelectStyles}
        /> */}

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
    backgroundColor: 'rgba(255, 240, 236, 0.8)', // Soft overlay color
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    color: '#000',
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

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 10,
    color: '#c2274b',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 10,
    color: '#000',
    paddingRight: 30,
    marginBottom: 10,
  },
  placeholder: {
    color: '#aaa', // Make placeholder text visible
  },
};
