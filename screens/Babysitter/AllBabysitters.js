import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import FilterModal from './FilterModal';

const { width } = Dimensions.get('window');
const cardWidth = width -40; 

const AllBabysitters = ({ navigation }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [selectedBabysitters, setSelectedBabysitters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStars, setSelectedStars] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedCities, selectedType]);

  const fetchData = async () => {
    try {
      let response;
      // Fetch all employees if no filters are applied
      if (!selectedCities && !selectedType) {
        response = await axios.get('http://176.119.254.188:8080/admin/getAllEmployees');
      } else {
        // Apply multiple filters
        if (selectedCities.length > 0 && selectedType) {
          response = await axios.post('http://176.119.254.188:8080/customer/filter/multiple', {
            cities: [selectedCities],
            type: selectedType,
          });
        } else if (selectedCities.length > 0) {
          response = await axios.post('http://176.119.254.188:8080/customer/filter/city', {
            cities: [selectedCities],
          });
        } else if (selectedType) {
          response = await axios.post('http://176.119.254.188:8080/customer/filter/type', {
            type: selectedType,
          });
        }
        else {
          response = await axios.get('http://176.119.254.188:8080/admin/getAllEmployees');

        }
      }

      // Set the fetched data to state
      setBabysitters(response.data);
    } catch (error) {
      console.error('Error fetching suggested babysitters:', error);
    }
  };

  const fetchStarsData = async () => {
    try {
        response = await axios.post('http://176.119.254.188:8080/customer/filter/stars', {
          stars: selectedStars,
        });   
        setBabysitters(response.data);
    } catch (error) {
      console.error('Error fetching babysitters by stars:', error);
    }
  };
  
  

  const navigateToBabysitterDetails = (babysitterId) => {
    navigation.navigate('BabysitterDetails', { babysitterId });
  };

  const toggleBabysitterSelection = (babysitterId) => {
    if (selectedBabysitters.includes(babysitterId)) {
      setSelectedBabysitters(selectedBabysitters.filter((id) => id !== babysitterId));
    } else {
      // Limit selection to 5 babysitters
      if (selectedBabysitters.length < 5) {
        setSelectedBabysitters([...selectedBabysitters, babysitterId]);
      } else {
        Alert.alert('Maximum Selection Reached', 'You can select up to 5 babysitters.');
      }
    }
  };

  const handleOrderNow = () => {
    if (selectedBabysitters.length > 0) {
      const selectedBabysittersNames = selectedBabysitters.map((id) => {
        const babysitter = babysitters.find((item) => item.user.id === id);
        return babysitter ? babysitter.user.name : '';
      });

      Alert.alert(
        'Selected Babysitters',
        selectedBabysittersNames.join(', '),
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', onPress: () => navigation.navigate('Book', { selectedBabysitters }) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('No Babysitter Selected', 'Please select at least one babysitter before proceeding.');
    }
  };

  const handleFastOrder = () => {
    navigation.navigate('FastOrder');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose Babysitters</Text>

      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="filter-list" size={24} color="white" />
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedStars={selectedStars}
        setSelectedStars={setSelectedStars}
        fetchData={fetchData}
        fetchStarsData={fetchStarsData} // Pass the new function

      />

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {babysitters.map((item) => (
          <TouchableOpacity
            key={item.user.id}
            onPress={() => navigateToBabysitterDetails(item.user.id)}
            style={[styles.card, { width: cardWidth }]}
          >
            <View style={styles.cardContent}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleBabysitterSelection(item.user.id)}
              >
                <MaterialIcons
                  name={selectedBabysitters.includes(item.user.id) ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color={selectedBabysitters.includes(item.user.id) ? '#c2274b' : '#000'}
                />
              </TouchableOpacity>
              <View style={styles.babysitterInfo}>
                <Text style={styles.babysitterName}>{item.user.name}</Text>
                <Text>{item.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fastOrderButton} onPress={handleFastOrder}>
          <MaterialIcons name="flash-on" size={24} color="white" />
          <Text style={styles.fastOrderButtonText}>Fast Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#556b8d',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#556b8d',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  filterButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  babysitterInfo: {
    flex: 1,
  },
  babysitterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c2274b',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#556b8d',
    padding: 10,
    borderRadius: 50,
    width: 150,
    justifyContent: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  fastOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c2274b',
    padding: 10,
    borderRadius: 50,
    width: 150,
    justifyContent: 'center',
  },
  fastOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default AllBabysitters;
