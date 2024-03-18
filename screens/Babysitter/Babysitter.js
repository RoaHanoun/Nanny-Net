import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Styles from '../Babysitter/Stayles'; // Import styles from the separate file
import Footer from '../Footer/Footer'; // Import the Footer component
import Nav from '../Navbar/Nav'; // Import the Navbar component

const Babysitter = ({ navigation }) => {
  // Dummy data for suggested babysitters
  const suggestedBabysitters = [
    { id: '1', name: 'Roa Hanoun ', city: 'Nablus 1', country: 'Palestine' },
    { id: '2', name: 'Malak ', city: 'Ramallah 2', country: 'Palestine' },
     { id: '3', name: 'Saliba', city: 'Betlahem', country: 'Palestine' },
    // Add more babysitters as needed
  ];

  const [searchText, setSearchText] = useState('');
  const filteredBabysitters = suggestedBabysitters.filter((babysitter) =>
    babysitter.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const navigateToBabysitterDetails = (babysitterId) => {
    // Navigate to the babysitter details screen, pass the babysitterId as a parameter
    navigation.navigate('BabysitterDetails', { babysitterId });
  };

  return (
    <View style={Styles.container}>
      {/* <Nav/> */}
      {/* Image at the top */}
      <Image
        source={require('../../assets/123.jpg')}
        style={Styles.coverImage}
        resizeMode="cover"
      />

      {/* Search box for name */}
      <View style={Styles.searchContainer}>
        <Text style={Styles.Title}>Available Babysitter</Text>
        <TextInput
          style={Styles.searchInput}
          placeholder="Search by Name"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>

      {/* List of suggested babysitters */}
      <FlatList
        data={filteredBabysitters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={Styles.babysitterCard}
            onPress={() => navigateToBabysitterDetails(item.id)}
          >
            <View>
              <Text style={Styles.name}>{item.name}</Text>
              <Text>{`${item.city}, ${item.country}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* "See All Babysitters" link at the bottom */}
      <TouchableOpacity
        style={Styles.seeAllLink}
        onPress={() => navigation.navigate('AllBabysitters')}
      >
        <Text style={Styles.seeAllText}>See All Babysitters</Text>
      </TouchableOpacity>

      <Footer navigation={navigation} />
    </View>
  );
};

export default Babysitter;
