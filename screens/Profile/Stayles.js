// Styles.js

import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descriptionText: {
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emailText: {
    color: '#c2274b',
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    backgroundColor: '#556b8d',
    paddingVertical: 10,
    paddingHorizontal: 30,
    margin:5,
    borderRadius: 7,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Styles;
