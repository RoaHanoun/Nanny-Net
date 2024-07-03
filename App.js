import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Signup2 from './screens/Signup2';
import SplashScreen from './screens/SplashScreen';
import CreateProfile from './screens/CreateProfile';
import Babysitter from './screens/Babysitter/Babysitter';
import Orders from './screens/Orders/Orders';
import OrderDetails from './screens/Orders/OrderDetails';
import Profile from './screens/Profile/Profile';
import EditProfile from './screens/Profile/EditProfile';
import BabysitterDetails from './screens/Babysitter/BabysitterDetails';
import AllBabysitters from './screens/Babysitter/AllBabysitters';
import Conformation from './screens/Babysitter/Conformation';
import Book from './screens/Payment/Book';
import OneTime from './screens/Payment/OneTime';
import Contract from './screens/Payment/Contract';
import Payment from './screens/Payment/Payment';
import Blog from './screens/Feedback/Blog';
import Settings from './screens/Profile/Settings';
import HelpScreen from './screens/Profile/HelpScreen';
import FeedbackScreen from './screens/Feedback/FeedbackScreen '
// import FeedbackScreen from './screens/Feedback/FeedbackScreen';
import ConfirmSignUp from './screens/ConfirmSignUp';
import Choose from './screens/Choose';
import SignupBabysitter from './screens/SignupB/SignupBabysitter';
import SignupBabysitter2 from './screens/SignupB/SignupBabysitter2';
import ForgetPassword from './screens/ForgetPassword';
import BindingOrder from './screens/Orders/BindingOrder';
import OrderDetail from './screens/Orders/OrderDetail';
import ConformationPayment from './screens/Payment/ConfirmationPayment'
// import ConformationPayment from './screens/Payment/ConformationPayment';
import CurrentOrder from './screens/Orders/CurrentOrder';
import FooterB from './screens/Footer/FooterB';
import ProfileB from './screens/BabysitterApp/ProfileB';
import OrdersB from './screens/BabysitterApp/OrdersBabysitter/OrdersB';
import CurrentOB from './screens/BabysitterApp/OrdersBabysitter/CurrentOB';
import BindingOB from './screens/BabysitterApp/OrdersBabysitter/BindingOB';
import EditProfileB from './screens/BabysitterApp/EditProfileB';
import SettingsB from './screens/BabysitterApp/SettingsB';
import BlogB from './screens/BabysitterApp/Feedback/BlogB';
import BabysitterB from './screens/BabysitterApp/Babysiiter/BabysitterB';
import AllBabysittersB from './screens/BabysitterApp/Babysiiter/AllBabysittersB';
import BabysitterDetailsB from './screens/BabysitterApp/Babysiiter/BabysitterDetailsB';
import OrderDetailsB from './screens/BabysitterApp/OrdersBabysitter/OrderDetailsB';
import OrderDetailB from './screens/BabysitterApp/OrdersBabysitter/OrderDetailB';
import FilterModal from './screens/Babysitter/FilterModal';
import FeedbackDetail from './screens/BabysitterApp/Feedback/FeedbackDetail';
import FeedbackDetails from './screens/Feedback/FeedbackDetails';
import BlogScreen from './screens/Feedback/BlogScreen';
import FastOrder from './screens/Orders/FastOrder';
import ConfirmFastOrder from './screens/Orders/ConfirmFastOrder';
import NotificationScreen from './screens/Babysitter/Notifications';
import Offers from './screens/Orders/Offers';
import OfferDetails from './screens/Orders/OfferDetails';
import OffersOrders from './screens/Orders/OffersOrders';
import OfferConfirmation from './screens/Orders/OfferConfirmation';
import OfferPending from './screens/Orders/OfferPending';
import OfferAccepted from './screens/Orders/OfferAccepted';
import OfferSubmitted from './screens/Orders/OfferSubmitted';
import Conformationoffer from './screens/Orders/ConformationOffer';
import AddOfferOrder from './screens/Orders/AddOfferOrder';
import AcceptedOrders from './screens/Orders/AcceptedOrders';
import AcceptedOB from './screens/BabysitterApp/OrdersBabysitter/AcceptedOB';
import OfferPay from './screens/Orders/OfferPay';
import BabysitterFeedback from './screens/Feedback/BabysitterFeedback';
import BabysitterFeedback2 from './screens/Feedback/BabysitterFeedback2';
import PasswordCodeVer from './screens/PasswordCodeVer';
import NewPassword from './screens/NewPassword';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signup2" component={Signup2} />
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
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
      <Stack.Screen name="Choose" component={Choose} />
      <Stack.Screen name="SignupBabysitter" component={SignupBabysitter} />
      <Stack.Screen name="SignupBabysitter2" component={SignupBabysitter2} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="BindingOrder" component={BindingOrder} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="ConformationPayment" component={ConformationPayment} />
      <Stack.Screen name="CurrentOrder" component={CurrentOrder} />
      <Stack.Screen name="FooterB" component={FooterB} />
      <Stack.Screen name="ProfileB" component={ProfileB} />
      <Stack.Screen name="OrdersB" component={OrdersB} />
      <Stack.Screen name="BindingOB" component={BindingOB} />
      <Stack.Screen name="CurrentOB" component={CurrentOB} />
      <Stack.Screen name="EditProfileB" component={EditProfileB} />
      <Stack.Screen name="SettingsB" component={SettingsB} />
      <Stack.Screen name="BlogB" component={BlogB} />
      <Stack.Screen name="BabysitterB" component={BabysitterB} />
      <Stack.Screen name="AllBabysittersB" component={AllBabysittersB} />
      <Stack.Screen name="BabysitterDetailsB" component={BabysitterDetailsB} />
      <Stack.Screen name="OrderDetailsB" component={OrderDetailsB} />
      <Stack.Screen name="OrderDetailB" component={OrderDetailB} />
      <Stack.Screen name="FilterModal" component={FilterModal} />
      <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} />
      <Stack.Screen name="FeedbackDetails" component={FeedbackDetails} />
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name="FastOrder" component={FastOrder} />
      <Stack.Screen name="ConfirmFastOrder" component={ConfirmFastOrder} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="OfferDetails" component={OfferDetails} />
      <Stack.Screen name="OfferConfirmation" component={OfferConfirmation} />
      <Stack.Screen name="OffersOrders" component={OffersOrders} />
      <Stack.Screen name="OfferPending" component={OfferPending} />
      <Stack.Screen name="OfferAccepted" component={OfferAccepted} />
      <Stack.Screen name="OfferSubmitted" component={OfferSubmitted} />
      <Stack.Screen name="Conformationoffer" component={Conformationoffer} />
      <Stack.Screen name="AddOfferOrder" component={AddOfferOrder} />
      <Stack.Screen name="AcceptedOrders" component={AcceptedOrders} />
      <Stack.Screen name="AcceptedOB" component={AcceptedOB} />
      <Stack.Screen name="OfferPay" component={OfferPay} />
      <Stack.Screen name="BabysitterFeedback" component={BabysitterFeedback} />
      <Stack.Screen name="BabysitterFeedback2" component={BabysitterFeedback2} />
      <Stack.Screen name="PasswordCodeVer" component={PasswordCodeVer} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
      {/* <View>
        <Text>Welcome to the Babysitter App!</Text>
      </View> */}
    </NavigationContainer>
  );
}

export default App;
