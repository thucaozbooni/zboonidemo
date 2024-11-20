import React, {PureComponent} from 'react';
import {
  ColorValue,
  StyleProp,
  TextInput,
  ViewStyle,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
  TextStyle,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import Text from '../TextCustom';
import Block from '../BlockCustom';
import Button from '../Button';
import {theme} from '../styles';
import styles from './Input.styles';
import {sizePixel} from '@core/helpers';
import {colors} from '@common/styles/themes';

interface Props {
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  autoCapitalize?: 'none'| 'characters'| 'words'| 'sentences';
  secure?: boolean;
  error?: string;
  color?:string;
  flex?: boolean;
  width?: number;
  height?: number;
  onBlur?: (e: any) => void;
  editable?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  placeholder?: string;
  multiline?: boolean;
  colorLabel?: string;
  onChangeText: (text: string) => void | undefined;
  value: string;
  placeholderTextColor?: ColorValue;
  margin?: any;
  focusable?: boolean;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  returnKeyType?:'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'none'
    | 'previous'
    | 'default'
    | 'emergency-call'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo';
  inputRef?: any;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  style?: StyleProp<TextStyle>;
  label?: string;
  rightLabel?: any;
  rightStyle?: StyleProp<ViewStyle>;
  onRightPress?: ()=>void;
  leftLabel?: any;
  leftStyle?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;
  onFocus?: () => void;
  styleError?: StyleProp<ViewStyle>;
}

export default class Input extends PureComponent<Props> {
  state = {
    toggleSecure: false,
  };

  _renderLabel() {
    const {label, error,colorLabel} = this.props;
    if (!label) {
      return null;
    } 
    return <Block flex={false}>{label ? <Text color={colorLabel}>{label}</Text> : null}</Block>;
  }

  _renderToggle() {
    const {secure, rightLabel} = this.props;
    const {toggleSecure} = this.state;

    if (!secure) {
      return null;
    }

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({toggleSecure: !toggleSecure})}>
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon
            color={theme.colors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'eye' : 'eye-off'}
          />
        )}
      </Button>
    );
  }

  _renderRight() {
    const {rightLabel, rightStyle, onRightPress} = this.props;

    if (!rightLabel) {
      return null;
    }

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel}
      </Button>
    );
  }

  _renderLeft() {
    const {leftLabel, leftStyle} = this.props;

    if (!leftLabel) {
      return null;
    }

    return (
      <Block flex={1} center={true} middle={true} style={[styles.leftToggle, leftStyle]}>
        {leftLabel}
      </Block>
    );
  }

  _renderError() {
    const {error, styleError} = this.props;
    if (error) {
      return (
        <Block flex={false} padding={[0, 0]} style={[styleError, styles.errorStyle]}>
          {error ? (
            <Text
              size={sizePixel.textFontSize(12)}
              color={colors.red}
              accent={typeof error === 'string'}>
              {error}
            </Text>
          ) : null}
        </Block>
      );
    }
    return;
  }

  render() {
    const {
      email,
      phone,
      // tslint:disable-next-line:variable-name
      number,
      autoCapitalize = 'none',
      secure,
      error,
      editable,
      style,
      numberOfLines,
      placeholder,
      width,
      height,
      color,
      multiline,
      onChangeText,
      value,
      flex = false,
      placeholderTextColor,
      margin,
      onBlur,
      focusable,
      autoFocus,
      blurOnSubmit,
      onSubmitEditing,
      returnKeyType,
      inputRef,
      leftLabel,
      maxLength,
      onFocus,
      ...props
    } = this.props;

    const {toggleSecure} = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      typeof error === 'string' && {borderColor: theme.colors.accent},
      style,
    ];

    const inputType = email
      ? 'email-address'
      : number
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';
    return (
      <Block
        flex={flex ? 1 : 0}
        margin={margin || 0}
        color={color}
        style={{width, height}}>
        {this._renderLabel()}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          keyboardType={inputType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || colors.grayText}
          numberOfLines={numberOfLines}
          multiline={multiline}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          onFocus={onFocus}
          maxLength={maxLength}
          ref={inputRef}
          focusable={focusable}
          autoFocus={autoFocus}
          editable={editable}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          {...props}
        />
        {this._renderLeft()}
        {this._renderToggle()}
        {this._renderRight()}
        {this._renderError()}
      </Block>
    );
  }
}
