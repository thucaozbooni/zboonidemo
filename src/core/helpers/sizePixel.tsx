import {Dimensions} from 'react-native';
import {isNote8or9} from './isNote8or9';
import * as _ from 'lodash';

const {width, height} = Dimensions.get('window');

/**
 * Screen UI matchs with size:
 * 1. Iphone X (375x812)
 * 2. Iphone 6 (375x667)
 * 3. Note9 (414 x 846)
 * 4 Note 10 (412 x 869)
 */
const standarWidth = isNote8or9() ? 355 : 375;
const standardHeight = 812;

// For design
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const boxHeight = (size: number) =>
  _.floor((size / standardHeight) * height);
export const boxWidth = (size: number) => (size / standarWidth) * width;
export const textFontSize = (size: number) =>
  Math.floor((size / standarWidth) * width);
export const buttonTextFontSize = (size: number) =>
  (size / standarWidth) * width;
export const titleFontSize = (size: number) => (size / standarWidth) * width;
export const buttonWidth = (size: number) => (size / standarWidth) * width;
export const buttonHeight = (size: number) => (size / standardHeight) * height;
export const lineHeight = (size: number) => (size / standardHeight) * height;
export const margin = (size: number) => (size / standardHeight) * height;
export const padding = (size: number) => (size / standarWidth) * width;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;
