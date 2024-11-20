/**
 * @flow
 */
// import { Typography, Colors, Assets } from 'react-native-ui-lib';
import {Dimensions} from 'react-native';

import fonts from './fonts';
import commonStyles from './common';
import * as theme from './themes';

const {width} = Dimensions.get('window');

const guidelineBaseWidth = 350;
const scale = (size: number): number => (width / guidelineBaseWidth) * size;

export {fonts, scale, commonStyles, theme};
