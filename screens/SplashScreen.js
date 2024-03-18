import React, { useEffect, useState } from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      // Navigate to the next screen after the logo disappears
      navigation.replace('Main'); 
    }, 8000); // Half a minute (30,000 milliseconds)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    // <ImageBackground
    //   source={require('../assets/background.png')} 
    //   style={styles.container}
    // >
    <View style={styles.container}>
      <View style={styles.centered}>
        {showLogo && (
          <Image
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
        )}
      </View>
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0ec",
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    // Other styling for the logo if needed
  },
});

export default SplashScreen;
