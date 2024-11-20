import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import Logo from '../assets/images/logo.svg';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
};

const SplashScreen = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Logo width={223} height={66} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;