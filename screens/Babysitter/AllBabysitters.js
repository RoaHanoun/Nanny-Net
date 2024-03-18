import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const AllBabysitters = ({ navigation }) => {
  // Dummy data for all babysitters
  const allBabysitters = [
    { id: '1', name: 'Roa Hanoun ', city: 'City 1', country: 'Country 1' },
    { id: '2', name: 'Malak ', city: 'City 2', country: 'Country 2' },
    { id: '3', name: 'Saliba', city: 'City 3', country: 'Country 3' },
    { id: '4', name: 'Babysitter 4', city: 'City 4', country: 'Country 4' },
    { id: '5', name: 'Babysitter 5', city: 'City 5', country: 'Country 5' },
    { id: '6', name: 'Babysitter 6', city: 'City 6', country: 'Country 6' },
    { id: '7', name: 'Babysitter 7', city: 'City 7', country: 'Country 7' },
    { id: '8', name: 'Babysitter 8', city: 'City 8', country: 'Country 8' },
    { id: '9', name: 'Babysitter 9', city: 'City 9', country: 'Country 9' },
    { id: '10', name: 'Babysitter 10', city: 'City 10', country: 'Country 10' },

    // Add more babysitters as needed
  ];

  const navigateToBabysitterDetails = (babysitterId) => {
    // Navigate to the babysitter details screen, pass the babysitterId as a parameter
    navigation.navigate('BabysitterDetails', { babysitterId });
  };

  return (
    <View style={styles.container}>
      {/* List of all babysitters */}
      <FlatList
        data={allBabysitters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateToBabysitterDetails(item.id)}
            style={styles.babysitterCard}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{`${item.city}, ${item.country}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  babysitterCard: {
    padding: 20,
    borderWidth: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 8,
  },
  name: {
    color: '#c2274b',
    fontWeight: 'bold',
  },
});

export default AllBabysitters;
