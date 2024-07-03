import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Styles from './Stayles'; // Import your styles
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All', 'Unread', or 'Read'
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, [selectedCategory]);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      let url;
      switch (selectedCategory) {
        case 'Unread':
          url = 'http://176.119.254.188:8080/user/notifications/unread';
          break;
        case 'Read':
          url = 'http://176.119.254.188:8080/user/notifications/read';
          break;
        case 'All':
        default:
          url = 'http://176.119.254.188:8080/user/notifications/all';
          break;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // const markAsRead = async (notificationId) => {
  //   try {
  //     const token = await AsyncStorage.getItem('jwt');
  //     await axios.patch(`http://176.119.254.188:8080/user/notifications/view`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     fetchNotifications(); // Refresh notifications after marking as read
  //   } catch (error) {
  //     console.error('Error marking notification as read:', error);
  //   }
  // };

  const handleNotificationClick = (notification) => {
    setCurrentNotification(notification);
    setModalVisible(true);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={Styles.notificationCard}
      onPress={() => handleNotificationClick(item)}
    >
      <Text style={Styles.notificationText}>{item.message}</Text>
      <Text style={Styles.notificationDate}>{new Date(item.notificationDate).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'All' && styles.activeButton]}
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Unread' && styles.activeButton]}
          onPress={() => setSelectedCategory('Unread')}
        >
          <Text style={styles.buttonText}>Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Read' && styles.activeButton]}
          onPress={() => setSelectedCategory('Read')}
        >
          <Text style={styles.buttonText}>Read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotificationItem}
        contentContainerStyle={{ paddingBottom: 50 }} // Padding at the bottom to prevent UI overlap
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Details</Text>
            {currentNotification && (
              <>
                <Text style={styles.notificationText}>{currentNotification.message}</Text>
                <Text style={styles.notificationDate}>
                  {new Date(currentNotification.notificationDate).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  style={styles.markAsReadButton}
                  onPress={() => {
                    // markAsRead(currentNotification.id);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#c2274b', // Active button background color
  },
  buttonText: {
    color: '#fff', // Text color for active button
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#888', // Lighter gray color
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#c2274b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  markAsReadButton: {
    backgroundColor: '#c2274b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  markAsReadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Notifications;
