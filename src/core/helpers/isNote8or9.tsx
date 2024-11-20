import {Dimensions, Platform} from 'react-native';

export function isNote8or9(): boolean {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'android' && dimen.width === 414 && dimen.height === 846
  );
}
