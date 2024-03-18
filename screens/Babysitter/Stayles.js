// styles.js

import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // alignItems: 'center',
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  searchContainer: {
    padding: 16,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  Title:{
    color: '#c2274b',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom:5,
  },
  babysitterCard: {
    padding: 20,
    borderWidth: 1,
    margin:10,
    borderWidth: 1,
    borderColor: '#556b8d',
    borderRadius: 8,
  },
  name:{
    color: "#c2274b",
    fontWeight: 'bold'
  },
  seeAllLink: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth:1,
    borderColor: '#c2274b',
    width: '90%',
  },
  seeAllText: {
    color: '#c2274b',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Styles;