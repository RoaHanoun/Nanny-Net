import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const FilterModal = ({
  modalVisible,
  setModalVisible,
  selectedCities,
  setSelectedCities,
  selectedType,
  setSelectedType,
  selectedStars,
  setSelectedStars,
  fetchData,
  fetchStarsData, // Receive the new function
}) => {
  const [localCities, setLocalCities] = useState(selectedCities);
  const [localType, setLocalType] = useState(selectedType);
  const [localStars, setLocalStars] = useState(selectedStars);
const starsOrder =() => {
  fetchStarsData(); // Call the new function if stars are selected
  setModalVisible(false);

}
  const applyFilters = () => {
    setSelectedCities(localCities);
    setSelectedType(localType);
    // setSelectedStars(localStars);
      fetchData();
    

    setModalVisible(false);

    // Reset local state values to initial state
    // setLocalCities([]);
    // setLocalType(null);
    // setLocalStars(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          <Text style={styles.label}>Select City:</Text>
          <RNPickerSelect
            onValueChange={(value) => setLocalCities(value)}
            items={[
              { label: 'BeitSahour', value: 'BeitSahour' },
              { label: 'BeithLehem', value: 'BeithLehem' },
              { label: 'Nablus', value: 'Nablus' },
              { label: 'Salfit', value: 'Salfit' },
              { label: 'Ramallah', value: 'Ramallah' },
            ]}
            value={localCities}
            placeholder={{ label: 'Select a city...', value: null }}
          />

          <Text style={styles.label}>Select Type:</Text>
          <RNPickerSelect
            onValueChange={(value) => setLocalType(value)}
            items={[
              { label: 'Medical', value: 'Medical' },
              { label: 'Special Care', value: 'Special Care' },
              { label: 'Above 5Y old', value: 'Above 5Y old' },
              { label: 'Under 5Y old', value: 'Under 5Y old' },
            ]}
            value={localType}
            placeholder={{ label: 'Select a type...', value: null }}
          />

          <Text style={styles.label}>Stars Order:</Text>

          <TouchableOpacity style={styles.StarButton} onPress={starsOrder}>
          <Text style={styles.buttonText}>Stars Ordering</Text>
          </TouchableOpacity>

          <Text style={styles.SpaceText}>____________________________________________</Text>

          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginVertical: 5,
  },
  SpaceText: {
    fontSize: 14,
    color: '#556b8d',
    fontWeight: 'bold',
  },
  StarButton: {
    backgroundColor: '#556b8d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  applyButton: {
    backgroundColor: '#3b7a57',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: '#ff7045',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FilterModal;
