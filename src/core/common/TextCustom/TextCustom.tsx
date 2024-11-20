import React, {FunctionComponent} from 'react';
import {Text} from 'react-native';

import styles from './TextCustom.styles';
import {If, Then, Else} from 'react-if';
import {boxWidth} from '../../helpers/sizePixel';

type Props = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  header?: boolean;
  title?: boolean;
  body?: boolean;
  caption?: boolean;
  small?: boolean;
  size?: number;
  transform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase' | undefined;
  align?: string;
  // styling
  regular?: boolean;
  bold?: boolean;
  semibold?: boolean;
  italic?: boolean;
  medium?: boolean;
  weight?: string;
  light?: boolean;
  center?: boolean;
  right?: boolean;
  spacing?: string; // letter-spacing
  height?: number; // line-height
  // colors
  color?: any;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  gray2?: boolean;
  lightGray?: boolean;
  style?: any;
  children?: any;
  content?: any;
  isUpperCase?: boolean;
  numberOfLines?: number;
  onPress?: () => void;
  underLine?: boolean;
  // ...props
};

const TextCustom: FunctionComponent<Props> = ({
  h1,
  h2,
  h3,
  header,
  title,
  body,
  caption,
  small,
  size,
  transform,
  align,
  // styling
  regular,
  bold,
  semibold,
  italic,
  medium,
  weight,
  light,
  center,
  right,
  spacing, // letter-spacing
  height, // line-height
  // colors
  color,
  accent,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  gray2,
  lightGray,
  style,
  children,
  content,
  onPress,
  underLine,
  ...props
}) => {
  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    header && styles.header,
    title && styles.title,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    size && {fontSize: boxWidth(size)},
    transform && {textTransform: transform},
    align && {textAlign: align},
    height && {lineHeight: height},
    spacing && {letterSpacing: spacing},
    weight && {fontWeight: weight},
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    italic && styles.italic,
    medium && styles.medium,
    light && styles.light,
    center && styles.center,
    right && styles.right,
    underLine && styles.textUnderLine,
    // color && styles[color],
    color && {color},
    // color shortcuts
    accent && styles.accent,
    primary && styles.primary,
    secondary && styles.secondary,
    tertiary && styles.tertiary,
    black && styles.black,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    lightGray && styles.lightGray,

    style, // rewrite predefined styles
  ];

  return (
    <Text style={textStyles} {...props} onPress={onPress}>
      <If condition={children !== null}>
        <Then>{children}</Then>
        <Else>{content}</Else>
      </If>
    </Text>
  );
};

export default TextCustom;
