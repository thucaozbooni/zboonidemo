import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  source?: string | object;
  children?: React.ReactNode;
};

import Arrow from '@assets/images/Arrow.svg';

const ButtonBack: FunctionComponent<Props> = ({
  // tslint:disable-next-line:no-console
  onPress = () => console.log('clickBack'),
  color = 'transparent',
  style,
  children,
  source
}) => (
  <TouchableOpacity style={[ styles.container,style]} onPress={onPress}>
    {children ? (
      children
    ) : (
      <Arrow />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    zIndex: 2,
    top: 0,
    left: 0,
  },
});

export default ButtonBack;
