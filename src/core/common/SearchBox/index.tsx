import React, {PureComponent} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

interface Props {
  onSearch: (val: string) => void;
  enterSearch?: (val: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  isPhone?: Boolean;
}

interface SearchState {
  searchVal: string;
}

export default class SearchBox extends PureComponent<Props, SearchState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchVal: '',
    };
  }

  componentDidMount() {
    this.setState({
      searchVal: '',
    });
  }

  _handleChange = (searchVal: string) => {
    this.setState({
      searchVal,
    });
    this.props.onSearch(searchVal);
  };

  reset = () => {
    this.setState({
      searchVal: '',
    });
    this.props.onSearch('');
  };

  _renderClearButton = () => {
    if (this.state.searchVal !== '') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({searchVal: ''});
            this.props.onSearch('');
          }}
          style={styles.iconClose}>
          <Icon
            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
            size={25}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const {placeholder, style} = this.props;
    return (
      <View style={styles.searchBox}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          style={[styles.inputSearch, style]}
          value={this.state.searchVal}
          returnKeyType={this.props.isPhone === true ? 'search' : 'default'}
          onChangeText={(text) => this._handleChange(text)}
          onSubmitEditing={() =>
            this.props.enterSearch ? this.props.enterSearch(this.state.searchVal) : {}
          }
        />
        <Icon
          size={20}
          name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
          style={styles.iconSearch}
          color="#979797"
        />
        {this._renderClearButton()}
      </View>
    );
  }
}
