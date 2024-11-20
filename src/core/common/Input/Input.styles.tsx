import { sizePixel } from '@core/helpers';
import {StyleSheet} from 'react-native';

import {theme} from '../styles';

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    fontSize: theme.sizes.font,
    fontWeight: '200',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
    backgroundColor: theme.colors.white
  },
  toggle: {
    position: 'absolute',
    alignItems: 'center',
    width: theme.sizes.base,
    height: sizePixel.boxWidth(20),
    borderRadius: sizePixel.boxWidth(20),
    right: 8,
    top: 8
  },
  leftToggle: {
    position: 'absolute',
    alignItems: 'center',
    width: theme.sizes.base * 2,
    height: sizePixel.boxWidth(48),
    left: 2,
  },
  errorStyle: {
    width: '85%'
  }
});

export default styles;
