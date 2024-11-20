import * as sizePixel from '../../helpers/sizePixel';

const colors = {
  backgroundColor: '#081633',
  primary: '#F68D22',
  white: '#FFFFFF',
  black: '#000000',
  grayTransparent: '#00000088',
  grayText: '#848484',
  gray: '#C4C4C4',
  gray2: '#F4F3F3',
  lightGray: '#E5E5E5',
  red: '#FF1919',
  grayDark: '#717171',
  transparent: 'transparent',
  warning: 'red',
  accent: '#F68D22',
  secondary: '#c5ff68',
  tertiary: '#f0c2ff',
  textGray: '#84847f',
  gray4: '#e3e3e3',
  yellowActive: '#96803F',
  lightYellow: 'rgba(228,195,99,0.28)',
  mainColor: '#EE4D62',
  yellow: '#D2A61F',
  border: 'rgba(82,77,69,.59)',
  startLinear: '#F2D270',
  finishLinear: '#FDF2C7',
  positive_price: '#0083DB',
  negative_price: '#C02AD1',
  green: '#00B141'
};

const sizes = {
  // global sizes
  base: sizePixel.boxWidth(20),
  baseWidth: sizePixel.boxWidth(20),
  baseHeight: sizePixel.boxHeight(20),
  baseFont: sizePixel.textFontSize(14),
  radius: sizePixel.buttonTextFontSize(4),
  padding: sizePixel.padding(24),
  border: sizePixel.buttonTextFontSize(4),
  font: sizePixel.textFontSize(14),

  // font sizes
  h1: sizePixel.textFontSize(22),
  h2: sizePixel.textFontSize(18),
  h3: sizePixel.textFontSize(14),
  header: sizePixel.textFontSize(18),
  title: sizePixel.textFontSize(16),
  body: sizePixel.textFontSize(14),
  caption: sizePixel.textFontSize(11),
  small: sizePixel.textFontSize(10),
  info: sizePixel.textFontSize(12),
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
  small: {
    fontSize: sizes.small,
  },
};

export {colors, sizes, fonts};
