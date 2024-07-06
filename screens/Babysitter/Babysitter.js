import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import Styles from '../Babysitter/Stayles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Babysitter = ({ navigation }) => {
  const [babysitters, setBabysitters] = useState([]);
  const [selectedBabysitters, setSelectedBabysitters] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

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
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data.slice(-4));
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={fetchNotifications}>
          <MaterialIcons name="notifications" size={30} color="#c2274b" />
        </TouchableOpacity>
      </View>
      <View style={Styles.topContainer}>
        <Image
          source={require('../../assets/123.jpg')}
          style={Styles.topImage}
          resizeMode="cover"
        />
        <View style={Styles.titleContainer}>
          <Text style={Styles.titleText}>Nanny Net</Text>
          <Text style={Styles.subtitleText}>  Enjoy exclusive benefits and offers by subscribing to our packages.
          Visit our website for more details</Text>
        </View>
      </View>

      <View style={Styles.buttonContainer}>
        {/* <TouchableOpacity style={Styles.customButton}>
          <Text style={Styles.buttonText}>Booking available</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Styles.customButton}
        onPress={() => navigation.navigate('Offers')}>
          <Text style={Styles.buttonText}>Special Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.customButton}
        onPress={() => navigation.navigate('AllBabysitters')}>
          <Text style={Styles.buttonText}>Request a Babysitter</Text>
        </TouchableOpacity>

        
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.modalTitle}>Notifications</Text>
            <TouchableOpacity
              style={Styles.seeAllLinkmodel}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Notifications');
              }}
            >
              <Text style={Styles.seeAllTextmodel}>See All</Text>
            </TouchableOpacity>
            {notifications.map((notification, index) => (
              <View key={index} style={Styles.notificationCard}>
                <Text style={Styles.notificationText}>{notification.message}</Text>
                <Text style={Styles.notificationDate}>{new Date(notification.notificationDate).toLocaleDateString()}</Text>
              </View>
            ))}
            <TouchableOpacity style={Styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={Styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </ScrollView>
  );
};

export default Babysitter;
