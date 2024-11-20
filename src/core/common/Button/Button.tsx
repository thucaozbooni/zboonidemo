import React, {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './Button.styles';
import {theme} from '../styles';
import {boxWidth, boxHeight} from '@core/helpers/sizePixel';

type Props = {
  width?: number;
  height?: number;
  style?: any;
  opacity?: number;
  gradient?: boolean;
  color?: string;
  colorGradient?: string[] | number[];
  end?: {x: number; y: number};
  start?: {x: number; y: number};
  locations?: number[];
  shadow?: boolean;
  children?: any;
  disabled?: boolean;
  activeOpacity?: number;
  justifyContent?:'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-end'
    | 'flex-start'
    | 'center';
  onPress?: () => void;
};

const Button: FunctionComponent<Props> = ({
  width = 84,
  height = 21,
  style,
  opacity = 1,
  gradient = false,
  color = theme.colors.white,
  end = {x: 1, y: 1},
  start = {x: 0, y: 0},
  locations = [0.1, 0.7, 0.9],
  shadow,
  disabled,
  activeOpacity,
  children,
  colorGradient = [theme.colors.primary, theme.colors.secondary],
  justifyContent = 'center',
  onPress,
  ...props
}) => {
  const buttonStyles = [
    styles.button,
    {justifyContent},
    {width: boxWidth(width || 0)},
    {height: boxHeight(height || 0)},
    shadow && styles.shadow,
    opacity && {opacity},
    // color && styles[color], // predefined styles colors for backgroundColor
    color && {backgroundColor: color}, // custom backgroundColor
    style,
  ];
  if (gradient) {
    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={activeOpacity}
        disabled={disabled}
        onPress={onPress}
        {...props}>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={activeOpacity || 1}
      disabled={disabled}
      onPress={onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
