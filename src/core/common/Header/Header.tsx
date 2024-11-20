import React, {FunctionComponent} from 'react';
import {SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Header.styles';
import Text from '../TextCustom';
import Block from '@common/BlockCustom';
import ButtonBack from '@common/ButtonBack';

type Props = {
  title: string;
  textColor?: string;
  backButton?: any;
  linear?: boolean;
  buttonBack?: boolean;
  children?: any;
  onPress?: () => void;
};

const Header: FunctionComponent<Props> = ({
  title = 'Title',
  linear,
  children,
  buttonBack= true,
  textColor = '#fff',
  backButton,
  onPress,
}) => {
  if (linear) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#A6164F', '#D524A0']}
          start={{x: 0, y: 0.6}}
          end={{x: 0, y: 1}}
          style={styles.container}>
          <Text title={true} style={styles.title} color={textColor}>
            {title}
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  } else {
    return (
      <Block flex={false} style={styles.container} margin={[12,0]}>
        <SafeAreaView />
        {buttonBack && <ButtonBack onPress={onPress} style={styles.buttonBack} children={backButton}/>}
        <Block style={styles.container} flex={false} center={true} middle={true}>
          <SafeAreaView />
          {typeof children !== 'undefined' ? (
            children
          ) : (
            <Text title={true} style={styles.title} color={textColor}>
              {title}
            </Text>
          )}
        </Block>
      </Block>
    );
  }
};

export default Header;
