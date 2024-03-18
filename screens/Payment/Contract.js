import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';

const Contract = ({ route, navigation }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [timeRanges, setTimeRanges] = useState([]);
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
    if (
      selectedDates.length === 0 ||
      !isValidTimeRanges(timeRanges) ||
      !locationCity ||
      !babysitterType ||
      !numberOfChildren
    ) {
      alert('Please fill in all required fields with valid data');
      return;
    }

    console.log('Order Placed:', {
      dates: selectedDates,
      timeRanges,
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
       // Navigate to PaymentScreen with required data
       navigation.navigate('Payment', {
        totalSalary: calculateTotalSalary(), // Pass any necessary data to PaymentScreen
       });
  };
  const calculateTotalSalary = () => {
    // Implement your logic to calculate total salary based on selected options
    // For example, you can calculate based on babysitterType, numberOfChildren, etc.
    // Return the calculated total salary
    return 100; // Replace with your actual calculation logic
  }
  const isValidTimeRanges = (ranges) => {
    const regex = /^(1[0-2]|0?[1-9]):[0-5]?[0-9] (AM|PM|pm|am)$/i;
    return ranges.every(
      (range) => regex.test(range.from) && regex.test(range.to)
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/back.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Dates:</Text>
          <Calendar
            onDayPress={(day) => {
              const updatedDates = selectedDates.includes(day.dateString)
                ? selectedDates.filter((date) => date !== day.dateString)
                : [...selectedDates, day.dateString];
              setSelectedDates(updatedDates);
            }}
            markedDates={selectedDates.reduce((marked, date) => {
              marked[date] = { selected: true, marked: true };
              return marked;
            }, {})}
          />

          {selectedDates.map((date, index) => (
            <React.Fragment key={date}>
              <Text style={styles.title}>{`Time From (${date}):`}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  const updatedRanges = [...timeRanges];
                  updatedRanges[index] = { ...updatedRanges[index], from: text };
                  setTimeRanges(updatedRanges);
                }}
                value={timeRanges[index]?.from || ''}
                placeholder="Enter time (HH:mm AM/PM)"
              />

              <Text style={styles.title}>{`Time To (${date}):`}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  const updatedRanges = [...timeRanges];
                  updatedRanges[index] = { ...updatedRanges[index], to: text };
                  setTimeRanges(updatedRanges);
                }}
                value={timeRanges[index]?.to || ''}
                placeholder="Enter time (HH:mm AM/PM)"
              />
            </React.Fragment>
          ))}

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

export default Contract;

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