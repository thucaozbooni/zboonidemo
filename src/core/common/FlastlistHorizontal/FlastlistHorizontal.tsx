import React, { FunctionComponent } from 'react';
import { FlatList, Animated, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import styles from './FlastlistHorizontal.styles';
import EmptyView from '../EmptyView';

type Props = {
  data: any[] | null ,
  renderItem: ListRenderItem<any> | null | undefined,
  renderFooter?: React.ComponentType<any> | React.ReactElement | null,
  headerComponent?: React.ComponentType<any> | React.ReactElement | null,
  horizontal?: boolean,
  scroll?: boolean,
  renderEmpty?: () => React.ReactElement | React.ComponentType<any> | null,
  style?: StyleProp<ViewStyle>,
  extraData?: any,
  contentContainerStyle?: StyleProp<ViewStyle>,
  headerStyle?: ViewStyle,
  footerStyle?:ViewStyle
};

const FlastlistHorizontal: FunctionComponent<Props> = ({
  data,
  extraData,
  renderItem,
  renderFooter,
  horizontal = false,
  style,
  headerComponent,
  scroll = true,
  contentContainerStyle,
  headerStyle,
  footerStyle,
  renderEmpty = () => EmptyView,
}) => {
  const scrollX = new Animated.Value(0);
  return (
    <FlatList
      horizontal={horizontal}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={headerStyle}
      // pagingEnabled
      scrollEnabled={scroll}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment="center"
      ListFooterComponentStyle={footerStyle}
      data={data}
      extraData={extraData}
      style={[styles.header, style]}
      contentContainerStyle={[contentContainerStyle, styles.content]}
      keyExtractor={(item, index: number) => `${index}`}
      renderItem={renderItem}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { x: scrollX } },
        },
      ], { useNativeDriver: false })}
      ListEmptyComponent={renderEmpty()}
      ListFooterComponent={renderFooter}
    />
  );
};

export default FlastlistHorizontal;
