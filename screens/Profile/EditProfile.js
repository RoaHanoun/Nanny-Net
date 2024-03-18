import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get the userProfile data passed from the Profile screen
  const { userProfile } = route.params;

  // State for the edited profile data
  const [editedProfile, setEditedProfile] = useState({
    name: userProfile.name,
    email: userProfile.email,
    // Add more fields as needed
  });

  const handleSaveChanges = () => {
    // Handle saving the edited profile data (you can implement your logic here)
    console.log('Save Changes button pressed with edited profile:', editedProfile);
    // Navigate back to the Profile screen
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      {/* Name input */}
      <Text style={styles.Title}>Name:</Text>
      <TextInput
        style={styles.input}
        value={editedProfile.name}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
      />

      {/* Email input */}
      <Text style={styles.Title}>Email:</Text>
      <TextInput
        style={styles.input}
        value={editedProfile.email}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
      />

      {/* Add more input fields as needed for additional profile data */}
      
      {/* Save Changes button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0ec',
  },
  Title:{
    color: "#c2274b",
    fontWeight: 'bold',
    paddingBottom:7,
    fontSize: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth:1,
    borderColor: '#556b8d',

  },
  saveButtonText: {
    color: '#556b8d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfile;
