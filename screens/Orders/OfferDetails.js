import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OfferDetails = ({ route, navigation }) => {
  const { offer } = route.params;
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedHours, setSelectedHours] = useState(1); // Initialize with the lowest available hour
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // Array to store selected user IDs
  const [canProceed, setCanProceed] = useState(false); // State to track if the user can proceed

  useEffect(() => {
    if (selectedRating > 0) {
      fetchUsersByRating(selectedRating);
    }
  }, [selectedRating]);

  useEffect(() => {
    // Enable proceed button validation
    setCanProceed(selectedHours > 0 && selectedUsers.length > 0 && selectedUsers.length <= 5);
  }, [selectedHours, selectedUsers]);

  const fetchUsersByRating = async (rating) => {
    try {
      const response = await axios.get(`http://176.119.254.188:8080/customer/filter/stars/${rating}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserPress = (userId) => {
    if (selectedUsers.includes(userId)) {
      // Remove the user from selected list if already selected
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else if (selectedUsers.length < 5) {
      // Add the user to selected list if not already selected and we have space
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    }
  };

  const handleNextPress = async () => {
    const requestBody = {
      maxHoursAllowed: selectedHours.toString(),
      maxStars: selectedRating.toString(),
      employeeIds: selectedUsers.join(','),
      offerTypeId: offer.id.toString(),
    };
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (token) {
        const response = await axios.post('http://176.119.254.188:8080/customer/offer/apply', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        // Navigate to the next screen with the offer.id
        navigation.navigate('OfferPay', { data }); // Pass data as a parameter
      } else {
        console.error('Token not found');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message || 'Failed to apply the offer. Please try again later.'}`);
      } else if (error.request) {
        alert('Error: No response received from the server.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.days}>UP TO {offer.hours} HOURS PER Order!</Text>

      <Text style={styles.hoursTitle}>Choose the Hours:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedHours(value)}
        items={Array.from({ length: offer.hours }, (_, index) => ({
          label: `${index + 1} hours`,
          value: index + 1,
        }))}
        style={pickerSelectStyles}
        value={selectedHours}
      />

      <Text style={styles.ratingTitle}>Choose the Stars Of Users:</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={selectedRating}
        selectedStar={(rating) => setSelectedRating(rating)}
        fullStarColor="#ffd700"
        emptyStarColor="#ccc"
        starSize={30}
      />

      <Text style={styles.userListTitle}>Users with {selectedRating} stars:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.user.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userCard,
              selectedUsers.includes(item.user.id) ? styles.selectedUserCard : styles.userCardDefault,
            ]}
            onPress={() => handleUserPress(item.user.id)}
          >
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.userCity}>{item.city}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.stars}
              starSize={18}
              fullStarColor="#ffd700"
              emptyStarColor="#ccc"
            />
          </TouchableOpacity>
        )}
        style={styles.userListContainer}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { opacity: canProceed ? 1 : 0.5 }]} // Disable button if no users selected or hour not selected or more than 5 babysitters selected
          onPress={handleNextPress}
          disabled={!canProceed}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferDetails;

const pickerSelectStyles = {
  inputIOS: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c2274b',
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputAndroid: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c2274b',
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0ec',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  days: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  hoursTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  userListTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  userListContainer: {
    flexGrow: 1, // Allows FlatList to use remaining space
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedUserCard: {
    backgroundColor: '#3b7a57',
  },
  userCardDefault: {
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userCity: {
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3b7a57',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
