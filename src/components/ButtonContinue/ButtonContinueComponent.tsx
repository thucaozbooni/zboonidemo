import React from 'react';

import Block from '@core/common/BlockCustom';
import Button from '@core/common/Button';
import { sizePixel } from '@core/helpers';
import { StyleSheet, Text } from 'react-native';
import { colors } from '@core/common/styles/themes';

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  opacity?: number;
  marginBottom?: number;
  textColor?: string;
  backgroundColor?: string;
}

const ButtonContinue: React.FC<Props> = ({ onPress, title, disabled, opacity, marginBottom = 16, textColor, backgroundColor }) => {
  return (
    <Block flex={false} center={true} margin={[0, 0, sizePixel.boxWidth(Number(marginBottom)), 0]}>
      <Button
        onPress={onPress}
        height={sizePixel.boxWidth(50)}
        disabled={disabled}
        opacity={opacity}
        color={backgroundColor ?? colors.black}
        style={[styles.button, {}]}>
        <Text style={{ color: textColor ?? '#fff' }}>
          {title}
        </Text>
      </Button>
    </Block>
  );
}

export default ButtonContinue;

const styles = StyleSheet.create({
  button: {
    borderRadius: sizePixel.boxWidth(30),
    width: '100%',
    borderWidth: sizePixel.boxWidth(1),
    borderColor: '#fff'
  }
})