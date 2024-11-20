import React, { FunctionComponent } from 'react';

import styles from './EmptyView.styles';
import Block from '../BlockCustom';
import Text from '../TextCustom';

type Props = {
  style?: any
}

const EmptyView: FunctionComponent<Props> = ({ style }) => {
  return (
    <Block center={true} style={[styles.emptyBlock, style]} middle={true}>
      {/* <Icon
        name="disconnect"
        color={theme.colors.gray2}
        size={theme.sizes.h1}
      /> */}
      {/* <Text> Loading false </Text> */}
    </Block>
  );
};

export default EmptyView;
