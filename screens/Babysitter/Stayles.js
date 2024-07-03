import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topImage: {
    height: height * 0.3,
    width: width * 0.8,
    borderRadius: 20,
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c2274b',
  },
  subtitleText: {
    fontSize: 16,
    color: '#556b8d',
    textAlign: 'center',
    marginTop: 10, 
    marginBottom: 30,
  },
  
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#556b8d',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
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
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seeAllLinkmodel: {
    marginBottom: 20,
  },
  seeAllTextmodel: {
    color: '#c2274b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationCard: {
    backgroundColor: '#fff0ec',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  notificationText: {
    fontSize: 16,
  },
  notificationDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#556b8d',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Styles;
