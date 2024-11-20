import React, {FunctionComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './style';

type Props = {
  size?: number;
  color?: string;
  style?: any;
};

const LoadingIndicator: FunctionComponent<Props> = ({size, color, style}) => (
  <View style={[styles.container, style]}>
    <ActivityIndicator size={size || 'large'} color={color || '#979797'} />
  </View>
);

export default LoadingIndicator;
