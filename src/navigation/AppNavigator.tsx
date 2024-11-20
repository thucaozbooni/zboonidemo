import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider, AuthContextType } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen'; // Ensure this path is correct or update it to the correct path
import SplashScreen from '../screens/SplashScreen'; // Ensure this path is correct or update it to the correct path
import SignUpScreen from '../screens/SignUpScreen'; // Ensure this path is correct or update it to the correct path
import SignInScreen from '../screens/SignInScreen'; // Ensure this path is correct or update it to the correct path
import WelcomeScreen from '../screens/WelcomeScreen'; // Ensure this path is correct or update it to the correct path
import Arrow from '@assets/images/Arrow.svg';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{
              headerBackTitleVisible: false,
              headerTitle: 'Create an account', headerTitleAlign: 'center', headerBackImage: () => (
                <Arrow
                  width={14}
                  height={24}
                  style={{
                    marginLeft: Platform.OS === 'android' ? 8 : 24
                  }}
                />
              )
            }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{
              headerBackTitleVisible: false,
              headerTitle: 'Welcome back', headerTitleAlign: 'center', headerBackImage: () => (
                <Arrow
                  width={14}
                  height={24}
                  style={{
                    marginLeft: Platform.OS === 'android' ? 8 : 24
                  }}
                />
              )
            }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;