import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import FilterModal from '../../Babysitter/FilterModal'; // Import the FilterModal component

const AllBabysittersB = ({ navigation }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [selectedBabysitters, setSelectedBabysitters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for filter modal visibility
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStars, setSelectedStars] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedCities, selectedType]);

  const fetchData = async () => {
    try {
      let response;
      
      // if (selectedStars) {
      //   fetchStarsData();
      //   return;
      // }

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
    navigation.navigate('BabysitterDetailsB', { babysitterId });
  };

  const toggleBabysitterSelection = (babysitterId) => {
    if (selectedBabysitters.includes(babysitterId)) {
      setSelectedBabysitters(selectedBabysitters.filter((id) => id !== babysitterId));
    } else {
      setSelectedBabysitters([...selectedBabysitters, babysitterId]);
    }
  };

  return (
    <View style={styles.container}>
   
      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="filter-list" size={24} color="white" style={styles.filterButtonIcon} />
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
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

      <ScrollView>
        {babysitters.map((item) => (
          <TouchableOpacity
            key={item.user.id}
            onPress={() => navigateToBabysitterDetails(item.user.id)}
            style={styles.babysitterCard}
          >
            <View style={styles.babysitterInfo}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleBabysitterSelection(item.user.id)}
              >
              
              </TouchableOpacity>
              <View style={styles.babysitterDetails}>
                <Text style={styles.name}>{item.user.name}</Text>
                <Text>{item.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  babysitterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    margin: 10,
    borderColor: '#556b8d',
    borderRadius: 8,
  },
  babysitterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  name: {
    color: '#c2274b',
    fontWeight: 'bold',
    marginRight: 10,
  },
  orderContainer: {
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: '#556b8d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  FastorderButton: {
    backgroundColor: '#c2274b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterButton: {
    top: 10,
    right: 100,
    backgroundColor: '#556b8d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 120,
  },
  filterButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  filterButtonIcon: {
    marginRight: 5,
    color: '#c2274b',
  },
  instructions: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#556b8d', // Adjust color as needed
  },
});

export default AllBabysittersB;
