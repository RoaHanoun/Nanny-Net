import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Offers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://176.119.254.188:8080/offerType/view/all')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(offer => ({
          id: offer.id,
          title: offer.description,
          subtitle: `Duration: ${offer.duration}`,
          days: offer.timesAllowed,
          hours: offer.maxHours,
          discount: offer.discountPercentage * 100,
        }));
        setOffersData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderOffer = ({ item }) => (
    <TouchableOpacity
      style={styles.offerBox}
      onPress={() => {
        setSelectedOffer(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.offerTitle}>{item.title}</Text>
      <Text style={styles.offerSubtitle}>{item.subtitle}</Text>
      <Icon name="info-circle" size={20} color="#3b7a57" style={styles.infoIcon} />
    </TouchableOpacity>
  );

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOffer(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OFFERS</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={offersData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOffer}
          numColumns={1} // Display offers in one column
          contentContainerStyle={styles.offerList}
        />
      )}

      {selectedOffer && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedOffer.title}</Text>
              <Text style={styles.modalSubtitle}>{selectedOffer.subtitle}</Text>
              {/* <View style={styles.detailContainer}>
                <Icon name="clock-o" size={20} color="#3b7a57" style={styles.detailIcon} />
                <Text style={styles.modalText}>Duration: {selectedOffer.days}</Text>
              </View> */}
              <View style={styles.detailContainer}>
                <Icon name="calendar" size={20} color="#3b7a57" style={styles.detailIcon} />
                <Text style={styles.modalText}>Number of Days: {selectedOffer.days}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Icon name="clock-o" size={20} color="#3b7a57" style={styles.detailIcon} />
                <Text style={styles.modalText}>UP TO {selectedOffer.hours} HOURS PER ORDER!</Text>
              </View>
              <View style={styles.detailContainer}>
                <Icon name="percent" size={20} color="#3b7a57" style={styles.detailIcon} />
                <Text style={styles.modalText}>Discount: {selectedOffer.discount}%</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleCloseModal();
                    navigation.navigate('OfferDetails', { offer: selectedOffer });
                  }}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Offers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0ec',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  offerList: {
    justifyContent: 'flex-start', // Ensure offers start from the top
  },
  offerBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  infoIcon: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  modalText: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
