import React, {PureComponent} from 'react';
import {View, Animated} from 'react-native';

import styles from './Block.styles';
import {boxHeight, boxWidth} from '../../helpers/sizePixel';

interface Props {
  flex?: boolean | number;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  card?: boolean;
  shadow?: boolean;
  color?: string;
  space?: 'around' | 'between' | 'evenly';
  padding?: any;
  margin?: any;
  animated?: boolean;
  wrap?: boolean;
  style?: any;
  children?: any;
}

export default class Block extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  _handleMargins = () => {
    const {margin} = this.props;
    if (typeof margin === 'number') {
      return {
        marginVertical: boxHeight(margin),
        marginHorizontal: boxWidth(margin),
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: boxHeight(margin[0]),
            marginRight: boxWidth(margin[0]),
            marginBottom: boxHeight(margin[0]),
            marginLeft: boxWidth(margin[0]),
          };
        case 2:
          return {
            marginTop: boxHeight(margin[0]),
            marginRight: boxWidth(margin[1]),
            marginBottom: boxHeight(margin[0]),
            marginLeft: boxWidth(margin[1]),
          };
        case 3:
          return {
            marginTop: boxHeight(margin[0]),
            marginRight: boxWidth(margin[1]),
            marginBottom: boxHeight(margin[2]),
            marginLeft: boxWidth(margin[1]),
          };
        default:
          return {
            marginTop: boxHeight(margin[0]),
            marginRight: boxWidth(margin[1]),
            marginBottom: boxHeight(margin[2]),
            marginLeft: boxWidth(margin[3]),
          };
      }
    }
  };

  _handlePaddings = () => {
    const {padding} = this.props;
    if (typeof padding === 'number') {
      return {
        paddingVertical: boxHeight(padding),
        paddingHorizontal: boxWidth(padding),
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: boxHeight(padding[0]),
            paddingRight: boxWidth(padding[0]),
            paddingBottom: boxHeight(padding[0]),
            paddingLeft: boxWidth(padding[0]),
          };
        case 2:
          return {
            paddingTop: boxHeight(padding[0]),
            paddingRight: boxWidth(padding[1]),
            paddingBottom: boxHeight(padding[0]),
            paddingLeft: boxWidth(padding[1]),
          };
        case 3:
          return {
            paddingTop: boxHeight(padding[0]),
            paddingRight: boxWidth(padding[1]),
            paddingBottom: boxHeight(padding[2]),
            paddingLeft: boxWidth(padding[1]),
          };
        default:
          return {
            paddingTop: boxHeight(padding[0]),
            paddingRight: boxWidth(padding[1]),
            paddingBottom: boxHeight(padding[2]),
            paddingLeft: boxWidth(padding[3]),
          };
      }
    }
  };

  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      color,
      space,
      padding,
      margin,
      animated,
      wrap,
      style,
      children,
      ...props
    } = this.props;

    const blockStyles = [
      styles.block,
      typeof flex === 'number' && {flex},
      flex === false && {flex: 0}, // reset / disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      margin && {...this._handleMargins()},
      padding && {...this._handlePaddings()},
      card && styles.card,
      shadow && styles.shadow,
      space && {justifyContent: `space-${space}`},
      wrap && {flexWrap: 'wrap'},
      // typeof color === 'string' && {color: color}, // predefined styles colors for backgroundColor
      typeof color !== 'undefined' && {backgroundColor: color}, // custom backgroundColor
      style, // rewrite predefined styles
    ];

    if (animated) {
      return (
        <Animated.View style={blockStyles} {...props}>
          {children}
        </Animated.View>
      );
    }

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}
