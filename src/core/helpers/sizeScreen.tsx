import { Dimensions } from 'react-native';

import * as _ from 'lodash';

const { width, height } = Dimensions.get('window');

export const sizeWidth = (size: number) => {
  return _.floor((width * size) / 100) || 1;
};

export const sizeHeight = (size: number) => {
  return _.floor((height * size) / 100) || 1;
};

export const sizeFont = (size: number) => {
  return _.floor((size / 375) * width) || 1;
};
export const sizeMaginTop = (size: number) => {
  return _.floor((size / 812) * width) || 1;
}