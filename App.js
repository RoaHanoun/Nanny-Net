import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';
import SplashScreen from './screens/SplashScreen';
import CreateProfile from './screens/CreateProfile';
import Babysitter from './screens/Babysitter/Babysitter';
import Orders from './screens/Orders/Orders';
import OrderDetails from './screens/Orders/OrderDetails';
import Profile from './screens/Profile/Profile';
import EditProfile from './screens/Profile/EditProfile'
import BabysitterDetails from './screens/Babysitter/BabysitterDetails';
import AllBabysitters from './screens/Babysitter/AllBabysitters';
import Conformation from './screens/Babysitter/Conformation';
import Book from './screens/Payment/Book';
import OneTime from './screens/Payment/OneTime';
import Contract from './screens/Payment/Contract';
import Payment from './screens/Payment/Payment';
import Blog from './screens/Feedback/Blog';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Babysitter" component={Babysitter} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="BabysitterDetails" component={BabysitterDetails} />
      <Stack.Screen name="AllBabysitters" component={AllBabysitters} />
      <Stack.Screen name="Conformation" component={Conformation} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="OneTime" component={OneTime} />
      <Stack.Screen name="Contract" component={Contract} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Blog" component={Blog} />


    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
