import React, { useState, useContext, useRef } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import { signUp } from '../redux/authSlice';
import store from '../redux/store';
import { AuthContext } from '../contexts/AuthContext';
import ButtonContinue from '@components/ButtonContinue';
import { Formik, FormikProps, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Input from '@common/Input';
import { AppContext } from '@contexts/AppContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Block from '@common/BlockCustom';
import { padding } from '@core/helpers/sizePixel';
import { theme } from '@common/styles';
import { CheckBox } from '@rneui/themed';

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();
  const countryCodeInputRef = useRef<TextInput>();
  const phoneNumberInputRef = useRef<TextInput>();
  const [isSelected, setSelection] = useState(false);

  const dispatch = useDispatch<typeof store.dispatch>();
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  if (!authContext || !appContext) {
    throw new Error('AuthContext or AppContext is undefined, make sure you are using AuthProvider and AppProvider');
  }
  const { setLoading } = appContext;

  interface SignUpValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
    phoneNumber: string;
  }

  const handleSignUp = async (values: SignUpValues, setFieldError: any) => {
    setLoading(true);
    try {
      await dispatch(signUp({
        email: values.email,
        password: values.password,
        phone_number: values.countryCode + values.phoneNumber,
        language: 'en',
        first_name: values.firstName,
        last_name: values.lastName
      })).unwrap();
      authContext.signIn();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        })
      );
    } catch (err) {
      console.log('Sign up error:', err);
      mapErrorsFromApi(err, setFieldError);
    } finally {
      setLoading(false);
    }
  };

  const mapErrorsFromApi = (errors: any, setFieldError: any) => {
    Object.keys(errors).forEach(function(key, index) {
      switch(key) {
        case 'phone_number': setFieldError('phoneNumber', errors[key][0]);
        break;
        case 'email': setFieldError('email', errors[key]);
        break;
        case 'password': setFieldError('password', errors[key]);
        break;
        case 'first_name': setFieldError('firstName', errors[key]);
        break;
        case 'last_name': setFieldError('lastName', errors[key]);
        break;
        case 'country_code': setFieldError('countryCode', errors[key]);
        break;
        case 'non_field_errors': Alert.alert('', errors[key]);
      }
    });
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    countryCode: Yup.string().required('Country code is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '', countryCode: '', phoneNumber: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          handleSignUp(values, setFieldError);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <Block flex={true} style={{
              justifyContent: 'center',
              paddingHorizontal: padding(24),
              marginBottom: padding(24),
              backgroundColor: theme.colors.white
            }}>
              <Input
                inputRef={firstNameInputRef}
                style={styles.input}
                placeholder="First name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                returnKeyType="next"
                onSubmitEditing={() => lastNameInputRef.current?.focus()}
                error={touched.firstName && errors.firstName ? errors.firstName : undefined}
              />
              <Input
                inputRef={lastNameInputRef}
                style={styles.input}
                placeholder="Last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
                error={touched.lastName && errors.lastName ? errors.lastName : undefined}
              />
              <Input
                inputRef={emailInputRef}
                style={styles.input}
                placeholder="Email Address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                email={true}
                error={touched.email && errors.email ? errors.email : undefined}
              />
              <Input
                inputRef={passwordInputRef}
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                returnKeyType="next"
                onSubmitEditing={() => countryCodeInputRef.current?.focus()}
                secure={true}
                error={touched.password && errors.password ? errors.password : undefined}
              />
            </Block>
            <Block flex={true} style={{
              justifyContent: 'center',
              paddingHorizontal: padding(24),
              backgroundColor: theme.colors.white
            }}>
              <Input
                inputRef={countryCodeInputRef}
                placeholder="Country Code"
                style={styles.input}
                value={values.countryCode}
                onChangeText={handleChange('countryCode')}
                onBlur={handleBlur('countryCode')}
                onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
                returnKeyType="next"
                error={touched.countryCode && errors.countryCode ? errors.countryCode : undefined}
              />
              <Input
                inputRef={phoneNumberInputRef}
                style={styles.input}
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                returnKeyType="done"
                phone={true}
                error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
              />
            </Block>
            <Block flex={true} middle={true} style={{
              paddingHorizontal: padding(24),
              justifyContent: 'center'
            }}>
              <CheckBox
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                title="By creating an account you agree to the
                      Terms and Conditions & Privacy Policy"
                containerStyle={{
                  backgroundColor: 'transparent'
                }}
                size={32}
              />
              <ButtonContinue title="Create Account" onPress={handleSubmit} disabled={appContext.state.loading || !isSelected} />
            </Block>
          </View>
        )}
      </Formik >
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
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default SignUpScreen;