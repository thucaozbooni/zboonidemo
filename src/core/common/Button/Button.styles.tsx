import {StyleSheet} from 'react-native';

import {theme} from '../styles';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    alignItems: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  secondary: {backgroundColor: theme.colors.secondary},
  tertiary: {backgroundColor: theme.colors.tertiary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.textGray},
  gray4: {backgroundColor: theme.colors.gray4},
});

export default styles;
