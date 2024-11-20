import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../assets/images/logo.svg';
import { NavigationProp } from '@react-navigation/native';
import Block from '@common/BlockCustom';
import ButtonContinue from '@components/ButtonContinue';

const WelcomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.container}>
      <Block middle={true} center={true} flex={2}>
        <Logo width={223} height={66} />
        <Text style={styles.title}>Say hello to cCommerce</Text>
      </Block>
      <Block flex={1} middle={true}>
        <ButtonContinue title="Log in" marginBottom={8} onPress={() => navigation.navigate('SignIn')} />
        <ButtonContinue title="Create a free account" textColor="#000" backgroundColor="#fff" onPress={() => navigation.navigate('SignUp')} />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#000'
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
});

export default WelcomeScreen;