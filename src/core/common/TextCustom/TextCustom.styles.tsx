import {StyleSheet} from 'react-native';

import {theme} from '../styles';

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    // fontFamily: 'Lato',
  },
  tertiary: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },

  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  accent: {
    fontWeight: '400',
    fontSize: 16,
  },
  textUnderLine: {
    textDecorationLine: 'underline',
  },

  // position (default is left)
  center: {textAlign: 'center', alignSelf: 'center'},
  right: {textAlign: 'right'},

  // colors
  primary: {color: theme.colors.primary},
  white: {color: theme.colors.white},
  black: {color: theme.colors.black},
  gray: {color: theme.colors.gray},
  gray2: {color: theme.colors.gray2},
  lightGray: {color: theme.colors.lightGray},
  red: {color: theme.colors.red},

  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  header: theme.fonts.header,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small,
  secondary: theme.fonts.small,
});

export default styles;
