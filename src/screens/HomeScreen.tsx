import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonContinue from '@components/ButtonContinue';

const HomeScreen: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();

  if (!authContext) {
    throw new Error('AuthContext is undefined, make sure you are using AuthProvider');
  }

  const { signOut } = authContext;

  const handleLogout = () => {
    signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <ButtonContinue title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24
  },
});

export default HomeScreen;