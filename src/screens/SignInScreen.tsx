import React, { useContext, useRef } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { signIn } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import store from 'redux/store';
import ButtonContinue from '@components/ButtonContinue';
import Input from '@common/Input';
import Block from '@common/BlockCustom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '@contexts/AppContext';
import { theme } from '@common/styles';
import { margin, padding } from '@core/helpers/sizePixel';

const SignInScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  if (!authContext || !appContext) {
    throw new Error('AuthContext or AppContext is undefined, make sure you are using AuthProvider and AppProvider');
  }

  const { signIn: authSignIn } = authContext;
  const { setLoading } = appContext;

  const handleSignIn = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await dispatch(signIn(values)).unwrap();
      authSignIn();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (err) {
      Alert.alert('', err as string || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSignIn(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <Block style={{
              justifyContent: 'center',
              paddingHorizontal: padding(24),
              paddingBottom: padding(24),
              backgroundColor: theme.colors.white
            }}>
              <Input
                inputRef={emailInputRef}
                style={styles.input}
                value={values.email}
                onChangeText={(textValues) => {
                  handleChange('email')(textValues);
                }}
                onBlur={handleBlur('email')}
                placeholder={'Email Address'}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                error={touched.email && errors.email ? errors.email : undefined}
                email={true}
              />
              <Input
                inputRef={passwordInputRef}
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder={'Password'}
                error={touched.password && errors.password ? errors.password : undefined}
                secure={true}
              />
            </Block>
            <Block style={{
              justifyContent: 'flex-end',
              paddingHorizontal: padding(24),
              marginTop: margin(24)
            }}>
              <ButtonContinue title="Log In" onPress={handleSubmit as any} marginBottom={0} />
            </Block>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 48,
    paddingBottom: 0,
    paddingHorizontal: 0
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default SignInScreen;
