import { sizePixel } from '@core/helpers';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textNumber: {
    position: 'absolute',
    maxHeight: 0,
    maxWidth: 0,
    backgroundColor: 'transparent',
    color: 'transparent',
  },
  textInput: {
    padding: 2,
    textAlign: 'center',
    fontSize: 20,
    borderBottomWidth: 2,
    color: '#5d5d5d',
  },
  text:{fontSize: 20, color: '#aaa'}
});

export default styles;
