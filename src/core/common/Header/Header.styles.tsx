import {StyleSheet} from 'react-native';

import { sizePixel } from '@core/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  title: {
    fontSize: sizePixel.boxHeight(18),
    marginTop: sizePixel.boxWidth(16),
  },
  buttonBack: {
    width: sizePixel.boxWidth(50), 
    marginLeft: 10, 
    paddingVertical: sizePixel.boxWidth(4),
    marginTop: sizePixel.boxWidth(12),
  }
});

export default styles;
