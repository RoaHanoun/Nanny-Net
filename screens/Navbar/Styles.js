// styles.js
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#c2274b',
    justifyContent: 'space-around',
    // borderBottomWidth: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    // flex:1,
    width: 70,
    height: 50,
  },
});

export default Styles;
