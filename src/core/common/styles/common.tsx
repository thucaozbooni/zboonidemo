import {StyleSheet} from 'react-native';

import {colors} from './themes';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 2,
  },
});
