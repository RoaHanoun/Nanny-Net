import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Alert } from 'react-native';
import FooterB from '../../Footer/FooterB'; // Import the Footer component
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const BabysitterB = ({ navigation }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://176.119.254.188:8080/admin/getAllEmployees');
      setBabysitters(response.data);
    } catch (error) {
      console.error('Error fetching suggested babysitters:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      const response = await axios.get('http://176.119.254.188:8080/user/notifications/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched notifications:', response.data); // Debugging line

      setNotifications(response.data.slice(0, 4)); // Only keep the first six notifications
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const navigateToBabysitterDetails = (babysitterId) => {
    // Navigate to the babysitter details screen, pass the babysitterId as a parameter
    navigation.navigate('BabysitterDetailsB', { babysitterId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={fetchNotifications}>
          <MaterialIcons name="notifications" size={30} color="#c2274b" />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../assets/123.jpg')}
        style={styles.coverImage}
        resizeMode="cover"
      />

      {/* List of suggested babysitters */}
      <FlatList
        data={babysitters.slice(0, 3)} // Display only the first three items
        keyExtractor={(item) => item.user.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateToBabysitterDetails(item.user.id)}
            style={styles.babysitterCard}
          >
            <Text style={styles.name}>{item.user.name}</Text>
            <Text>{item.city}</Text>
          </TouchableOpacity>
        )}
      />

      {/* "See All Babysitters" link at the bottom */}
      <TouchableOpacity
        style={styles.seeAllLink}
        onPress={() => navigation.navigate('AllBabysittersB')}
      >
        <Text style={styles.seeAllText}>See All Babysitters</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity
              style={styles.seeAllLinkmodel}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Notifications');
              }}
            >
              <Text style={styles.seeAllTextmodel}>See All</Text>
            </TouchableOpacity>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.notificationCard}>
                  <Text style={styles.notificationText}>{item.message}</Text>
                  <Text style={styles.notificationDate}>{new Date(item.notificationDate).toLocaleDateString()}</Text>
                </View>
              )}
            />

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FooterB navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    alignItems: 'flex-start',
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  babysitterCard: {
    padding: 20,
    borderWidth: 1,
    margin: 10,
    borderColor: '#556b8d',
    borderRadius: 8,
  },
  name: {
    color: "#c2274b",
    fontWeight: 'bold',
  },
  seeAllLink: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#556b8d',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    // borderWidth: 1,
    // borderColor: '#c2274b',
    width: '90%',
  },
  seeAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    color: '#556b8d',
  },
  notificationDate: {
    fontSize: 12,
    color: '#888', // Lighter gray color
    textAlign: 'right',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#c2274b',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  seeAllLinkmodel: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  seeAllTextmodel: {
    color: '#c2274b', // Same color used in the notification icon
    fontSize: 16,
    textDecorationLine: 'underline',},
});

export default BabysitterB;
