import { StyleSheet } from 'react-native';
import { sizePixel } from '@core/helpers';

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex:1
  },
  inputSearch: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: sizePixel.boxWidth(30),
    width: '100%'
  },
  iconSearch: {
    position: 'absolute',
    left: sizePixel.boxWidth(8),
  },
  iconClose: {
    position: 'absolute',
    right: sizePixel.boxWidth(8),
  },
});

export default styles;
